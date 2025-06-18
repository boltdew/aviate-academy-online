
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentService } from "@/services/contentService";
import { useSidebarNew } from "@/components/ui/sidebar-new";

interface HierarchicalContentTreeProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function HierarchicalContentTree({ selectedContent, onContentSelect }: HierarchicalContentTreeProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const { open } = useSidebarNew();

  // Get content structure from ContentService
  const contentStructure = ContentService.getContentStructure();

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
      newExpanded.add(chapterCode);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleSection = (chapterCode: string, sectionKey: string) => {
    const sectionId = `${chapterCode}-${sectionKey}`;
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleContentSelect = (chapter: string, section: string, file: string) => {
    const contentKey = { chapter, section, file };
    
    // If already selected, deselect
    if (selectedContent && 
        selectedContent.chapter === chapter && 
        selectedContent.section === section && 
        selectedContent.file === file) {
      onContentSelect(null);
    } else {
      onContentSelect(contentKey);
    }
  };

  if (!open) {
    return (
      <div className="flex flex-col items-center py-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-tertiary-container flex items-center justify-center shadow-elevation-1">
          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-tertiary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-2 sm:px-3 py-2 sm:py-3"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xl bg-tertiary-container flex items-center justify-center shadow-elevation-1">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-tertiary" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-on-surface label-medium sm:label-large">
            Aircraft Systems
          </p>
        </div>
        <div className="h-px bg-outline-variant"></div>
      </motion.div>

      {/* Hierarchical Content Tree */}
      <div className="space-y-1 px-1 sm:px-2">
        {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
          const isChapterExpanded = expandedChapters.has(chapterCode);
          
          return (
            <div key={chapterCode} className="w-full">
              {/* Chapter Level */}
              <div
                className={cn(
                  "flex items-center px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-all duration-200 hover:bg-primary-container cursor-pointer rounded-lg sm:rounded-xl group",
                )}
                onClick={() => toggleChapter(chapterCode)}
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  {isChapterExpanded ? (
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-on-surface-variant flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-on-surface-variant flex-shrink-0" />
                  )}
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0 shadow-elevation-1">
                    <Folder className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-secondary" />
                  </div>
                  <span className="text-xs font-mono bg-surface-variant text-on-surface-variant px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg min-w-[2rem] sm:min-w-[2.5rem] text-center flex-shrink-0 label-small">
                    {chapterCode}
                  </span>
                  <span className="text-on-surface text-xs sm:text-sm font-medium truncate body-small sm:body-medium">
                    {chapterData.title}
                  </span>
                </div>
              </div>

              {/* Sections Level */}
              {isChapterExpanded && (
                <div className="ml-4 sm:ml-8 space-y-1 border-l-2 border-outline-variant pl-2 sm:pl-4 mt-2">
                  {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => {
                    const sectionId = `${chapterCode}-${sectionKey}`;
                    const isSectionExpanded = expandedSections.has(section);
                    
                    return (
                      <div key={sectionKey} className="space-y-1">
                        {/* Section Header */}
                        <div
                          className={cn(
                            "flex items-center px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 hover:bg-secondary-container cursor-pointer rounded-md sm:rounded-lg",
                          )}
                          onClick={() => toggleSection(chapterCode, sectionKey)}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-lg bg-tertiary-container flex items-center justify-center flex-shrink-0 shadow-elevation-1">
                              {isSectionExpanded ? (
                                <FolderOpen className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-tertiary" />
                              ) : (
                                <Folder className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-tertiary" />
                              )}
                            </div>
                            <span className="text-on-surface-variant text-xs sm:text-sm capitalize truncate body-small sm:body-medium">
                              {sectionKey}
                            </span>
                          </div>
                        </div>
                        
                        {/* Files Level */}
                        {isSectionExpanded && (
                          <div className="ml-3 sm:ml-6 space-y-1 border-l border-outline-variant pl-2 sm:pl-4">
                            {sectionData.files.map((file) => (
                              <div
                                key={file.id}
                                className={cn(
                                  "flex items-center px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 hover:bg-primary-container cursor-pointer rounded-md sm:rounded-lg group",
                                  selectedContent?.chapter === chapterCode && 
                                  selectedContent?.section === sectionKey && 
                                  selectedContent?.file === file.slug &&
                                  "bg-primary-container text-on-primary-container font-medium shadow-elevation-1",
                                )}
                                onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                              >
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-lg bg-surface-variant flex items-center justify-center flex-shrink-0">
                                    <FileText className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-on-surface-variant" />
                                  </div>
                                  <span className="text-on-surface text-xs sm:text-sm truncate group-hover:text-on-primary-container transition-colors body-small sm:body-medium">
                                    {file.title}
                                  </span>
                                </div>
                              </div>
                            ))}
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
