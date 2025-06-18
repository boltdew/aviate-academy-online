
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
        <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <LayoutDashboard className="text-blue-600 dark:text-blue-400 h-3 w-3" />
        </div>
      ),
    },
  ];

  return (
    <SidebarNew open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          {open ? <Logo /> : <LogoIcon />}
          
          {/* Navigation Links */}
          <div className="mt-6 flex flex-col gap-1">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>

          {/* Hierarchical Content Tree */}
          <div className="mt-6">
            <HierarchicalContentTree 
              selectedContent={selectedContent}
              onContentSelect={onContentSelect}
            />
          </div>
        </div>
      </SidebarBody>
    </SidebarNew>
  );
}

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-3 items-center text-sm text-black dark:text-white py-3 px-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
        <Plane className="h-4 w-4 text-white rotate-45" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-neutral-900 dark:text-white whitespace-pre text-base"
      >
        AeroLearn
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-3 px-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
        <Plane className="h-4 w-4 text-white rotate-45" />
      </div>
    </div>
  );
};
