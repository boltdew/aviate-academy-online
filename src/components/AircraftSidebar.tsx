
"use client";

import { useState } from "react";
import { SidebarNew, SidebarBody, SidebarLink } from "@/components/ui/sidebar-new";
import { LayoutDashboard, Plane, User, Settings, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HierarchicalContentTree } from "./sidebar/HierarchicalContentTree";

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function AircraftSidebar({ selectedContent, onContentSelect }: AircraftSidebarProps) {
  const [open, setOpen] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <div className="w-6 h-6 rounded-xl bg-primary-container flex items-center justify-center shadow-elevation-1">
          <LayoutDashboard className="text-primary h-4 w-4" />
        </div>
      ),
      onClick: () => {
        setSelectedFunction(null);
        onContentSelect(null);
      }
    },
  ];

  const userFunctions = [
    {
      label: "Profile",
      function: "profile",
      icon: (
        <div className="w-6 h-6 rounded-xl bg-secondary-container flex items-center justify-center shadow-elevation-1">
          <User className="text-secondary h-4 w-4" />
        </div>
      ),
    },
    {
      label: "Statistics",
      function: "stats",
      icon: (
        <div className="w-6 h-6 rounded-xl bg-tertiary-container flex items-center justify-center shadow-elevation-1">
          <BarChart3 className="text-tertiary h-4 w-4" />
        </div>
      ),
    },
    {
      label: "Settings",
      function: "settings",
      icon: (
        <div className="w-6 h-6 rounded-xl bg-surface-variant flex items-center justify-center shadow-elevation-1">
          <Settings className="text-on-surface-variant h-4 w-4" />
        </div>
      ),
    },
  ];

  const handleFunctionSelect = (functionName: string) => {
    setSelectedFunction(functionName);
    onContentSelect(null); // Clear content selection when switching to user functions
  };

  return (
    <SidebarNew open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          {open ? <Logo /> : <LogoIcon />}
          
          {/* Navigation Links */}
          <div className="mt-6 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink 
                key={idx} 
                link={link} 
                onClick={link.onClick}
                className={selectedFunction === null && selectedContent === null ? "bg-primary-container" : ""}
              />
            ))}
          </div>

          {/* User Functions */}
          <div className="mt-6">
            <div className="px-4 mb-3">
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                User Functions
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {userFunctions.map((func, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center justify-start gap-3 group/sidebar py-3 px-4 rounded-2xl hover:bg-primary-container transition-colors duration-200 cursor-pointer",
                    selectedFunction === func.function ? "bg-primary-container" : ""
                  )}
                  onClick={() => handleFunctionSelect(func.function)}
                >
                  {func.icon}
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className="text-on-surface text-sm group-hover/sidebar:text-on-primary-container transition duration-150 whitespace-pre inline-block !p-0 !m-0 body-medium"
                  >
                    {func.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Hierarchical Content Tree */}
          <div className="mt-6">
            <div className="px-4 mb-3">
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Learning Content
              </h3>
            </div>
            <HierarchicalContentTree 
              selectedContent={selectedContent}
              onContentSelect={(content) => {
                setSelectedFunction(null);
                onContentSelect(content);
              }}
            />
          </div>
        </div>

        {/* Pass selectedFunction to parent component */}
        <div className="hidden">
          {selectedFunction && window.dispatchEvent(new CustomEvent('userFunctionSelected', { detail: selectedFunction }))}
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
