
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
    width: "20rem",
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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
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
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r",
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
                              AeroLearn
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
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    {/* Navigation Items */}
                    <a
                      href="/dashboard"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                        pathname?.includes("dashboard") &&
                          "bg-muted text-blue-600",
                      )}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Dashboard</p>
                        )}
                      </motion.li>
                    </a>
                    
                    <div className={cn(
                      "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary cursor-pointer",
                    )}>
                      <Book className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">All Content</p>
                        )}
                      </motion.li>
                    </div>

                    <div className={cn(
                      "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary cursor-pointer",
                    )}>
                      <User className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">My Progress</p>
                        )}
                      </motion.li>
                    </div>

                    <Separator className="w-full my-2" />
                    
                    {!isCollapsed && (
                      <motion.div variants={variants} className="px-2 py-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          ATA Chapters
                        </p>
                      </motion.div>
                    )}

                    {/* ATA Chapters with hierarchical structure */}
                    {Object.entries(contentStructure).map(([chapterCode, chapterData]) => {
                      const isExpanded = expandedChapters.has(chapterCode);
                      
                      return (
                        <div key={chapterCode} className="w-full">
                          {/* Chapter Header */}
                          <div
                            className={cn(
                              "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary cursor-pointer",
                            )}
                            onClick={() => toggleChapter(chapterCode)}
                          >
                            <span className="text-xs font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded min-w-[2rem] text-center">
                              {chapterCode}
                            </span>
                            <motion.li variants={variants} className="flex items-center justify-between w-full">
                              {!isCollapsed && (
                                <>
                                  <p className="ml-2 text-sm font-medium truncate">
                                    {chapterData.title}
                                  </p>
                                  {isExpanded ? (
                                    <ChevronDown className="h-3 w-3 ml-1" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  )}
                                </>
                              )}
                            </motion.li>
                          </div>

                          {/* Chapter Sections */}
                          {isExpanded && !isCollapsed && (
                            <div className="ml-4 mt-1 space-y-1">
                              {Object.entries(chapterData.sections).map(([sectionKey, sectionData]) => (
                                <div key={sectionKey} className="space-y-1">
                                  {sectionData.files.map((file) => (
                                    <div
                                      key={file.id}
                                      className={cn(
                                        "flex h-7 w-full flex-row items-center rounded-md px-2 py-1 transition hover:bg-muted hover:text-primary cursor-pointer text-sm",
                                        selectedContent?.chapter === chapterCode && 
                                        selectedContent?.section === sectionKey && 
                                        selectedContent?.file === file.slug &&
                                        "bg-muted text-blue-600",
                                      )}
                                      onClick={() => handleContentSelect(chapterCode, sectionKey, file.slug)}
                                    >
                                      <FileText className="h-3 w-3" />
                                      <p className="ml-2 text-xs truncate">
                                        {file.title}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
              
              {/* Footer */}
              <div className="flex flex-col p-2">
                <div className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary cursor-pointer">
                  <Settings className="h-4 w-4 shrink-0" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Settings</p>
                    )}
                  </motion.li>
                </div>
                
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
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
                              <p className="text-sm font-medium">
                                {user?.firstName || "User"}
                              </p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
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
