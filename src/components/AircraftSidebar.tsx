
"use client";

import { useState } from "react";
import { SidebarNew, SidebarBody, SidebarLink } from "@/components/ui/sidebar-new";
import { LayoutDashboard, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HierarchicalContentTree } from "./sidebar/HierarchicalContentTree";

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function AircraftSidebar({ selectedContent, onContentSelect }: AircraftSidebarProps) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className={cn("flex flex-col md:flex-row bg-white dark:bg-neutral-900 w-full flex-1 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
      <SidebarNew open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-4">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            {open ? <Logo /> : <LogoIcon />}
            
            {/* Navigation Links */}
            <div className="mt-4 flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>

            {/* Hierarchical Content Tree */}
            <HierarchicalContentTree 
              selectedContent={selectedContent}
              onContentSelect={onContentSelect}
            />
          </div>
        </SidebarBody>
      </SidebarNew>
    </div>
  );
}

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20">
      <div className="h-5 w-6 bg-blue-600 dark:bg-blue-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <Plane className="h-3 w-3 text-white m-1" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        AeroLearn Docs
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20">
      <div className="h-5 w-6 bg-blue-600 dark:bg-blue-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <Plane className="h-3 w-3 text-white m-1" />
      </div>
    </div>
  );
};
