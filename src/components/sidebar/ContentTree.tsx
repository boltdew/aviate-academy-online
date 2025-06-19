
"use client";

import { useState, useEffect } from "react";
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
import type { ContentStructure } from "@/types/ata";

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

interface ContentTreeProps {
  isCollapsed: boolean;
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function ContentTree({ isCollapsed, selectedContent, onContentSelect }: ContentTreeProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [contentStructure, setContentStructure] = useState<ContentStructure>({});
  const [loading, setLoading] = useState(true);

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

  const toggleChapter = (chapterCode: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterCode)) {
      newExpanded.delete(chapterCode);
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

  if (loading) {
    return (
      <div className="px-2 py-4">
        <p className="text-xs text-slate-500">Loading content...</p>
      </div>
    );
  }

  return (
    <>
      {!isCollapsed && (
        <motion.div variants={variants} className="px-1 py-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Aircraft Systems
          </p>
        </motion.div>
      )}

      {/* ATA Chapters with hierarchical structure */}
      {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
        const isChapterExpanded = expandedChapters.has(chapterCode);
        
        return (
          <div key={chapterCode} className="w-full">
            {/* Chapter Header */}
            <div
              className={cn(
                "flex h-7 w-full flex-row items-center rounded-md px-2 py-1.5 text-sm transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer group",
              )}
              onClick={() => toggleChapter(chapterCode)}
            >
              {isChapterExpanded ? (
                <ChevronDown className="h-3 w-3 mr-1 text-slate-500" />
              ) : (
                <ChevronRight className="h-3 w-3 mr-1 text-slate-500" />
              )}
              <span className="text-xs font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded min-w-[2.5rem] text-center mr-2">
                {chapterCode}
              </span>
              <motion.li variants={variants} className="flex items-center justify-between w-full">
                {!isCollapsed && (
                  <p className="text-sm text-slate-700 truncate font-medium">
                    {chapterData.title}
                  </p>
                )}
              </motion.li>
            </div>

            {/* Chapter Sections */}
            {isChapterExpanded && !isCollapsed && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => {
                  const sectionId = `${chapterCode}-${sectionKey}`;
                  const isSectionExpanded = expandedSections.has(sectionId);
                  
                  return (
                    <div key={sectionKey} className="space-y-1">
                      {/* Section Header */}
                      <div
                        className={cn(
                          "flex h-6 w-full flex-row items-center rounded-md px-2 py-1 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer text-sm",
                        )}
                        onClick={() => toggleSection(chapterCode, sectionKey)}
                      >
                        {isSectionExpanded ? (
                          <FolderOpen className="h-3 w-3 mr-2 text-slate-400" />
                        ) : (
                          <Folder className="h-3 w-3 mr-2 text-slate-400" />
                        )}
                        <p className="text-xs text-slate-600 capitalize truncate">
                          {sectionKey}
                        </p>
                      </div>
                      
                      {/* Files in Section */}
                      {isSectionExpanded && (
                        <div className="ml-5 space-y-0.5 border-l border-slate-100 pl-3">
                          {sectionData.files.map((file) => (
                            <div
                              key={file.id}
                              className={cn(
                                "flex h-6 w-full flex-row items-center rounded-md px-2 py-1 transition hover:bg-blue-50 hover:text-blue-900 cursor-pointer text-sm",
                                selectedContent?.chapter === chapterCode && 
                                selectedContent?.section === sectionKey && 
                                selectedContent?.file === file.slug &&
                                "bg-blue-100 text-blue-900 font-medium",
                              )}
                              onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                            >
                              <FileText className="h-3 w-3 mr-2 text-slate-400" />
                              <p className="text-xs truncate">
                                {file.title}
                              </p>
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
    </>
  );
}
