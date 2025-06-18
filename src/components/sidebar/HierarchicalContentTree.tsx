
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
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
    return null;
  }

  return (
    <div className="flex flex-col space-y-1 mt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-2 py-1"
      >
        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Aircraft Systems
        </p>
      </motion.div>

      {/* Hierarchical Content Tree */}
      <div className="space-y-1">
        {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
          const isChapterExpanded = expandedChapters.has(chapterCode);
          
          return (
            <div key={chapterCode} className="w-full">
              {/* Chapter Level */}
              <div
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer rounded-md group",
                )}
                onClick={() => toggleChapter(chapterCode)}
              >
                {isChapterExpanded ? (
                  <ChevronDown className="h-3 w-3 mr-2 text-neutral-500 dark:text-neutral-400" />
                ) : (
                  <ChevronRight className="h-3 w-3 mr-2 text-neutral-500 dark:text-neutral-400" />
                )}
                <Folder className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded min-w-[2.5rem] text-center mr-2">
                  {chapterCode}
                </span>
                <span className="text-neutral-700 dark:text-neutral-200 truncate font-medium">
                  {chapterData.title}
                </span>
              </div>

              {/* Sections Level */}
              {isChapterExpanded && (
                <div className="ml-6 space-y-1 border-l border-neutral-200 dark:border-neutral-700 pl-3">
                  {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => {
                    const sectionId = `${chapterCode}-${sectionKey}`;
                    const isSectionExpanded = expandedSections.has(sectionId);
                    
                    return (
                      <div key={sectionKey} className="space-y-1">
                        {/* Section Header */}
                        <div
                          className={cn(
                            "flex items-center px-2 py-1 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer rounded-md",
                          )}
                          onClick={() => toggleSection(chapterCode, sectionKey)}
                        >
                          {isSectionExpanded ? (
                            <FolderOpen className="h-3 w-3 mr-2 text-neutral-400" />
                          ) : (
                            <Folder className="h-3 w-3 mr-2 text-neutral-400" />
                          )}
                          <span className="text-xs text-neutral-600 dark:text-neutral-300 capitalize truncate">
                            {sectionKey}
                          </span>
                        </div>
                        
                        {/* Files Level */}
                        {isSectionExpanded && (
                          <div className="ml-5 space-y-0.5 border-l border-neutral-100 dark:border-neutral-800 pl-3">
                            {sectionData.files.map((file) => (
                              <div
                                key={file.id}
                                className={cn(
                                  "flex items-center px-2 py-1 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer rounded-md",
                                  selectedContent?.chapter === chapterCode && 
                                  selectedContent?.section === sectionKey && 
                                  selectedContent?.file === file.slug &&
                                  "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium",
                                )}
                                onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                              >
                                <FileText className="h-3 w-3 mr-2 text-neutral-400" />
                                <span className="text-xs truncate">
                                  {file.title}
                                </span>
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
