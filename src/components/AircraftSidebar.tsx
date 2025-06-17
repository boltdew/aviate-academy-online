
"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { ContentTree } from "./sidebar/ContentTree";
import { SidebarFooter } from "./sidebar/SidebarFooter";

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

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
};

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function AircraftSidebar({ selectedContent, onContentSelect }: AircraftSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <SidebarHeader isCollapsed={isCollapsed} />

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-2">
                <ScrollArea className="h-16 grow p-3">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    {/* Navigation Items */}
                    <SidebarNavigation isCollapsed={isCollapsed} />

                    <Separator className="w-full my-3" />
                    
                    {/* Content Tree */}
                    <ContentTree 
                      isCollapsed={isCollapsed}
                      selectedContent={selectedContent}
                      onContentSelect={onContentSelect}
                    />
                  </div>
                </ScrollArea>
              </div>
              
              {/* Footer */}
              <div className="flex flex-col p-2 border-t">
                <SidebarFooter isCollapsed={isCollapsed} />
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
