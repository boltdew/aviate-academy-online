
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
        <div className="w-6 h-6 rounded-xl bg-primary-container flex items-center justify-center shadow-elevation-1">
          <LayoutDashboard className="text-primary h-4 w-4" />
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
          <div className="mt-6 flex flex-col gap-2">
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
    <div className="font-normal flex space-x-3 items-center text-sm text-on-surface py-4 px-2 relative z-20">
      <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2">
        <Plane className="h-5 w-5 text-on-primary rotate-45" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-on-surface whitespace-pre title-large"
      >
        AeroLearn
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-on-surface py-4 px-2 relative z-20">
      <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2">
        <Plane className="h-5 w-5 text-on-primary rotate-45" />
      </div>
    </div>
  );
};
