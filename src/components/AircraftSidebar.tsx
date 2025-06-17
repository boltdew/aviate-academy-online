
"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Book,
  Settings,
  User,
  ChevronsUpDown,
  LayoutDashboard,
  GraduationCap,
  FileText,
  LogOut,
  UserCircle,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useUser, useClerk } from "@clerk/clerk-react";
import { ContentService } from "@/services/contentService";

const sidebarVariants = {
  open: {
    width: "22rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

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

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function AircraftSidebar({ selectedContent, onContentSelect }: AircraftSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useUser();
  const { signOut } = useClerk();

  // Get content structure from ContentService
  const contentStructure = ContentService.getContentStructure();

  const handleSignOut = () => {
    signOut();
  };

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

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r bg-white",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-white dark:bg-black transition-all`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            {/* Header */}
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full" asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-fit items-center gap-2 px-2"
                    >
                      <Avatar className='rounded size-4'>
                        <AvatarFallback>
                          <Plane className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <motion.li
                        variants={variants}
                        className="flex w-fit items-center gap-2"
                      >
                        {!isCollapsed && (
                          <>
                            <p className="text-sm font-medium">
                              AeroLearn Docs
                            </p>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
                          </>
                        )}
                      </motion.li>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Documentation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-2">
                <ScrollArea className="h-16 grow p-3">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    {/* Navigation Items */}
                    <a
                      href="/dashboard"
                      className={cn(
                        "flex h-7 w-full flex-row items-center rounded-md px-2 py-1.5 text-sm transition hover:bg-slate-100 hover:text-slate-900",
                        pathname?.includes("dashboard") &&
                          "bg-slate-100 text-slate-900 font-medium",
                      )}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm">Dashboard</p>
                        )}
                      </motion.li>
                    </a>

                    <Separator className="w-full my-3" />
                    
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
                  </div>
                </ScrollArea>
              </div>
              
              {/* Footer */}
              <div className="flex flex-col p-2 border-t">
                <div className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer">
                  <Settings className="h-4 w-4 shrink-0" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm">Settings</p>
                    )}
                  </motion.li>
                </div>
                
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">
                        <Avatar className="size-4">
                          <AvatarFallback>
                            {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <motion.li
                          variants={variants}
                          className="flex w-full items-center gap-2"
                        >
                          {!isCollapsed && (
                            <>
                              <p className="text-sm">
                                {user?.firstName || "User"}
                              </p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-slate-400" />
                            </>
                          )}
                        </motion.li>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-6">
                          <AvatarFallback>
                            {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">
                            {user?.fullName || "User"}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {user?.emailAddresses[0]?.emailAddress || "user@aerolearn.com"}
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
