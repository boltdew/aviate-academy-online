
"use client";

import { useState } from "react";
import { SidebarNew, SidebarBody, SidebarLink } from "@/components/ui/sidebar-new";
import { LayoutDashboard, Plane, User, Settings, BarChart3, Sparkles, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HierarchicalContentTree } from "./sidebar/HierarchicalContentTree";

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
}

export function AircraftSidebar({ selectedContent, onContentSelect }: AircraftSidebarProps) {
  const [open, setOpen] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const links = [
    {
      label: "Dashboard Overview",
      href: "/dashboard",
      icon: (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elevation-2">
          <LayoutDashboard className="text-on-primary h-4 w-4" />
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
      label: "Profile & Achievements",
      function: "profile",
      icon: (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-elevation-2">
          <User className="text-on-secondary h-4 w-4" />
        </div>
      ),
    },
    {
      label: "Learning Analytics",
      function: "stats",
      icon: (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-tertiary to-tertiary/80 flex items-center justify-center shadow-elevation-2">
          <BarChart3 className="text-on-tertiary h-4 w-4" />
        </div>
      ),
    },
    {
      label: "Premium Settings",
      function: "settings",
      icon: (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-surface-variant to-surface-container-high flex items-center justify-center shadow-elevation-2">
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
      <SidebarBody className="justify-between gap-8">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Enhanced Logo */}
          {open ? <Logo /> : <LogoIcon />}
          
          {/* Main Navigation */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="px-2 mb-4">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
                Main Navigation
              </h3>
            </div>
            {links.map((link, idx) => (
              <SidebarLink 
                key={idx} 
                link={link} 
                onClick={link.onClick}
                className={cn(
                  "shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300",
                  selectedFunction === null && selectedContent === null ? "bg-primary-container shadow-elevation-2" : ""
                )}
              />
            ))}
          </div>

          {/* Enhanced User Functions */}
          <div className="mt-8">
            <div className="px-2 mb-4">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
                Personal Space
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {userFunctions.map((func, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center justify-start gap-3 group/sidebar py-3 px-4 rounded-2xl hover:bg-primary-container transition-all duration-300 cursor-pointer shadow-elevation-1 hover:shadow-elevation-3",
                    selectedFunction === func.function ? "bg-primary-container shadow-elevation-2" : ""
                  )}
                  onClick={() => handleFunctionSelect(func.function)}
                >
                  {func.icon}
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className="text-on-surface text-sm group-hover/sidebar:text-on-primary-container transition duration-300 whitespace-pre inline-block !p-0 !m-0 body-medium font-medium"
                  >
                    {func.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Content Tree */}
          <div className="mt-8 flex-1">
            <div className="px-2 mb-4">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
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

        {/* Enhanced Footer */}
        <div className="border-t border-outline-variant pt-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-tertiary-container/30 shadow-elevation-1">
            <div className="w-6 h-6 rounded-xl bg-tertiary flex items-center justify-center">
              <Award className="h-3 w-3 text-on-tertiary" />
            </div>
            {open && (
              <div className="flex-1">
                <p className="text-xs font-medium text-on-surface label-medium">Premium Active</p>
                <p className="text-xs text-on-surface-variant body-small">Level 12 Engineer</p>
              </div>
            )}
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
    <div className="font-normal flex space-x-4 items-center text-sm text-on-surface py-6 px-2 relative z-20">
      <div className="h-12 w-12 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-3xl flex items-center justify-center shadow-elevation-3">
        <Plane className="h-6 w-6 text-on-primary rotate-45" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col"
      >
        <span className="font-bold text-on-surface whitespace-pre title-medium">
          AeroLearn Pro
        </span>
        <span className="text-xs text-on-surface-variant body-small opacity-80">
          Advanced Engineering Platform
        </span>
      </motion.div>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-on-surface py-6 px-2 relative z-20">
      <div className="h-12 w-12 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-3xl flex items-center justify-center shadow-elevation-3">
        <Plane className="h-6 w-6 text-on-primary rotate-45" />
      </div>
    </div>
  );
};
