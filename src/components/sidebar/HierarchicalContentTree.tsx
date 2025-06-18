
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
        <div className="w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
          <BookOpen className="h-3 w-3 text-orange-600 dark:text-orange-400" />
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
        className="px-3 py-2"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <BookOpen className="h-3 w-3 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Aircraft Systems
          </p>
        </div>
        <div className="h-px bg-neutral-200 dark:bg-neutral-700"></div>
      </motion.div>

      {/* Hierarchical Content Tree */}
      <div className="space-y-1 px-1">
        {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
          const isChapterExpanded = expandedChapters.has(chapterCode);
          
          return (
            <div key={chapterCode} className="w-full">
              {/* Chapter Level */}
              <div
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer rounded-lg group",
                )}
                onClick={() => toggleChapter(chapterCode)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {isChapterExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                  )}
                  <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <Folder className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md min-w-[2rem] text-center flex-shrink-0">
                    {chapterCode}
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-200 text-sm font-medium truncate">
                    {chapterData.title}
                  </span>
                </div>
              </div>

              {/* Sections Level */}
              {isChapterExpanded && (
                <div className="ml-6 space-y-1 border-l-2 border-neutral-100 dark:border-neutral-800 pl-4 mt-1">
                  {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => {
                    const sectionId = `${chapterCode}-${sectionKey}`;
                    const isSectionExpanded = expandedSections.has(sectionId);
                    
                    return (
                      <div key={sectionKey} className="space-y-1">
                        {/* Section Header */}
                        <div
                          className={cn(
                            "flex items-center px-3 py-2 text-sm transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer rounded-lg",
                          )}
                          onClick={() => toggleSection(chapterCode, sectionKey)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                              {isSectionExpanded ? (
                                <FolderOpen className="h-2 w-2 text-green-600 dark:text-green-400" />
                              ) : (
                                <Folder className="h-2 w-2 text-green-600 dark:text-green-400" />
                              )}
                            </div>
                            <span className="text-neutral-600 dark:text-neutral-300 text-sm capitalize truncate">
                              {sectionKey}
                            </span>
                          </div>
                        </div>
                        
                        {/* Files Level */}
                        {isSectionExpanded && (
                          <div className="ml-6 space-y-0.5 border-l border-neutral-100 dark:border-neutral-800 pl-4">
                            {sectionData.files.map((file) => (
                              <div
                                key={file.id}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer rounded-lg group",
                                  selectedContent?.chapter === chapterCode && 
                                  selectedContent?.section === sectionKey && 
                                  selectedContent?.file === file.slug &&
                                  "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium shadow-sm",
                                )}
                                onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <FileText className="h-2 w-2 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <span className="text-neutral-700 dark:text-neutral-200 text-sm truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
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
