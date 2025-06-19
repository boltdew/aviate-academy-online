
"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  BookOpen,
  Grid3X3,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentService } from "@/services/contentService";
import { BookmarkService } from "@/services/bookmarkService";
import { useMaterialSidebar } from "@/components/ui/material-sidebar";
import type { ContentStructure } from "@/types/ata";

interface HierarchicalContentTreeProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  selectedSection?: { chapter: string; section: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
  onSectionSelect?: (section: { chapter: string; section: string } | null) => void;
}

export function HierarchicalContentTree({ 
  selectedContent, 
  selectedSection,
  onContentSelect, 
  onSectionSelect 
}: HierarchicalContentTreeProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [contentStructure, setContentStructure] = useState<ContentStructure>({});
  const [loading, setLoading] = useState(true);
  const { isOpen } = useMaterialSidebar();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const structure = await ContentService.getContentStructure();
        setContentStructure(structure);
      } catch (error) {
        console.error('Failed to load content structure:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Load bookmarks
  useEffect(() => {
    setBookmarks(BookmarkService.getBookmarks());
  }, []);

  // Check if content is bookmarked
  const isContentBookmarked = (chapter: string, section: string, file: string) => {
    const contentId = `${chapter}-${section}-${file}`;
    return BookmarkService.isBookmarked(contentId);
  };

  // Auto-collapse logic: only keep currently selected chapter/section expanded
  useEffect(() => {
    if (selectedContent) {
      // Keep only the selected chapter expanded
      setExpandedChapters(new Set([selectedContent.chapter]));
      // Keep only the selected section expanded
      setExpandedSections(new Set([`${selectedContent.chapter}-${selectedContent.section}`]));
    } else if (selectedSection) {
      // Keep only the selected chapter expanded
      setExpandedChapters(new Set([selectedSection.chapter]));
      // Keep only the selected section expanded  
      setExpandedSections(new Set([`${selectedSection.chapter}-${selectedSection.section}`]));
    }
  }, [selectedContent, selectedSection]);

  const toggleChapter = (chapterCode: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterCode)) {
      newExpanded.delete(chapterCode);
      // Also collapse all sections in this chapter
      const sectionsToRemove = Array.from(expandedSections).filter(sectionId => 
        sectionId.startsWith(`${chapterCode}-`)
      );
      sectionsToRemove.forEach(sectionId => {
        const newSections = new Set(expandedSections);
        newSections.delete(sectionId);
        setExpandedSections(newSections);
      });
    } else {
      // Auto-collapse: close all other chapters and open this one
      newExpanded.clear();
      newExpanded.add(chapterCode);
      // Clear all expanded sections when switching chapters
      setExpandedSections(new Set());
    }
    setExpandedChapters(newExpanded);
  };

  const toggleSection = (chapterCode: string, sectionKey: string) => {
    const sectionId = `${chapterCode}-${sectionKey}`;
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      // Auto-collapse: close all other sections and open this one
      newExpanded.clear();
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleSectionClick = (chapter: string, section: string) => {
    if (onSectionSelect) {
      const sectionKey = { chapter, section };
      
      if (selectedSection && 
          selectedSection.chapter === chapter && 
          selectedSection.section === section) {
        onSectionSelect(null);
      } else {
        onSectionSelect(sectionKey);
        window.dispatchEvent(new CustomEvent('sectionSelected', { detail: sectionKey }));
      }
    }
  };

  const handleContentSelect = (chapter: string, section: string, file: string) => {
    const contentKey = { chapter, section, file };
    
    if (selectedContent && 
        selectedContent.chapter === chapter && 
        selectedContent.section === section && 
        selectedContent.file === file) {
      onContentSelect(null);
    } else {
      onContentSelect(contentKey);
    }
  };

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center py-4">
        <div className="w-8 h-8 rounded-xl bg-tertiary-container flex items-center justify-center shadow-elevation-1">
          <BookOpen className="h-4 w-4 text-tertiary" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 py-4">
        <p className="text-xs text-on-surface-variant">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Content Tree */}
      <div className="space-y-1">
        {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
          const isChapterExpanded = expandedChapters.has(chapterCode);
          
          return (
            <div key={chapterCode}>
              {/* Chapter Level */}
              <div
                className="flex items-center px-3 py-2.5 text-sm transition-all duration-200 hover:bg-primary-container cursor-pointer rounded-xl group"
                onClick={() => toggleChapter(chapterCode)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {isChapterExpanded ? (
                    <ChevronDown className="h-4 w-4 text-on-surface-variant flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-on-surface-variant flex-shrink-0" />
                  )}
                  <div className="w-4 h-4 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0">
                    <Folder className="h-2.5 w-2.5 text-secondary" />
                  </div>
                  <span className="text-xs font-mono bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-lg flex-shrink-0">
                    {chapterCode}
                  </span>
                  <span className="text-on-surface text-sm font-medium truncate">
                    {chapterData.title}
                  </span>
                </div>
              </div>

              {/* Sections Level */}
              {isChapterExpanded && (
                <div className="ml-6 space-y-1 border-l-2 border-outline-variant pl-3 mt-1">
                  {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => {
                    const sectionId = `${chapterCode}-${sectionKey}`;
                    const isSectionExpanded = expandedSections.has(sectionId);
                    const isSectionSelected = selectedSection && 
                      selectedSection.chapter === chapterCode && 
                      selectedSection.section === sectionKey;
                    
                    return (
                      <div key={sectionKey} className="space-y-1">
                        {/* Section Header */}
                        <div
                          className={cn(
                            "flex items-center px-3 py-2 text-sm transition-all duration-200 cursor-pointer rounded-lg group",
                            isSectionSelected 
                              ? "bg-primary-container text-on-primary-container shadow-elevation-1" 
                              : "hover:bg-secondary-container"
                          )}
                          onClick={() => handleSectionClick(chapterCode, sectionKey)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={cn(
                              "w-4 h-4 rounded-lg flex items-center justify-center flex-shrink-0",
                              isSectionSelected 
                                ? "bg-primary text-on-primary" 
                                : "bg-tertiary-container"
                            )}>
                              <Grid3X3 className="h-2.5 w-2.5 text-current" />
                            </div>
                            <span className="text-xs font-mono bg-surface-variant text-on-surface-variant px-1.5 py-0.5 rounded text-center flex-shrink-0">
                              {chapterCode}-{sectionKey}
                            </span>
                            <span className={cn(
                              "text-sm capitalize truncate font-medium",
                              isSectionSelected ? "text-on-primary-container" : "text-on-surface-variant"
                            )}>
                              Section {sectionKey}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-on-surface-variant bg-surface-variant px-1.5 py-0.5 rounded">
                              {sectionData.files?.length || 0}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(chapterCode, sectionKey);
                              }}
                              className="p-0.5 hover:bg-surface-variant rounded transition-colors"
                            >
                              {isSectionExpanded ? (
                                <ChevronDown className="h-3 w-3 text-on-surface-variant" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-on-surface-variant" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Files Level */}
                        {isSectionExpanded && sectionData.files && (
                          <div className="ml-4 space-y-1 border-l border-outline-variant pl-3">
                            {sectionData.files.map((file) => {
                              const isBookmarked = isContentBookmarked(chapterCode, sectionKey, file.slug);
                              const isSelected = selectedContent?.chapter === chapterCode && 
                                selectedContent?.section === sectionKey && 
                                selectedContent?.file === file.slug;
                              
                              return (
                                <div
                                  key={file.id}
                                  className={cn(
                                    "flex items-center px-3 py-2 text-sm transition-all duration-200 hover:bg-primary-container cursor-pointer rounded-lg group",
                                    isSelected &&
                                    "bg-primary-container text-on-primary-container font-medium shadow-elevation-1",
                                  )}
                                  onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="w-3 h-3 rounded bg-surface-variant flex items-center justify-center flex-shrink-0">
                                      <FileText className="h-2 w-2 text-on-surface-variant" />
                                    </div>
                                    <span className="text-on-surface text-sm truncate group-hover:text-on-primary-container transition-colors">
                                      {file.title}
                                    </span>
                                    {isBookmarked && (
                                      <Bookmark className="h-3 w-3 text-primary fill-primary flex-shrink-0" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
