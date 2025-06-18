
"use client";

import { useState } from "react";
import { 
  MaterialSidebar, 
  MaterialSidebarOverlay,
  MaterialSidebarContent,
  MaterialSidebarHeader,
  MaterialSidebarBody,
  MaterialSidebarFooter,
  MaterialSidebarItem,
  useMaterialSidebar
} from "@/components/ui/material-sidebar";
import { Plane, Award, BookOpen } from "lucide-react";
import { HierarchicalContentTree } from "./sidebar/HierarchicalContentTree";

interface AircraftSidebarProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  selectedSection?: { chapter: string; section: string } | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
  onSectionSelect?: (section: { chapter: string; section: string } | null) => void;
}

const SidebarLogo = () => {
  const { isOpen } = useMaterialSidebar();

  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-3xl flex items-center justify-center shadow-elevation-3 flex-shrink-0">
        <Plane className="h-6 w-6 text-on-primary rotate-45" />
      </div>
      {isOpen && (
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-on-surface whitespace-nowrap title-medium">
            Aircraft Systems
          </span>
          <span className="text-xs text-on-surface-variant body-small opacity-80">
            Learning Content
          </span>
        </div>
      )}
    </div>
  );
};

const SidebarFooterContent = () => {
  const { isOpen } = useMaterialSidebar();

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-tertiary-container/30 shadow-elevation-1">
      <div className="w-6 h-6 rounded-xl bg-tertiary flex items-center justify-center flex-shrink-0">
        <Award className="h-3 w-3 text-on-tertiary" />
      </div>
      {isOpen && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-on-surface label-medium">Premium Active</p>
          <p className="text-xs text-on-surface-variant body-small">Level 12 Engineer</p>
        </div>
      )}
    </div>
  );
};

const SidebarContentWrapper = ({ 
  selectedContent, 
  selectedSection, 
  onContentSelect, 
  onSectionSelect 
}: AircraftSidebarProps) => {
  return (
    <MaterialSidebarContent>
      <MaterialSidebarHeader>
        <SidebarLogo />
      </MaterialSidebarHeader>
      
      <MaterialSidebarBody>
        <HierarchicalContentTree 
          selectedContent={selectedContent}
          selectedSection={selectedSection}
          onContentSelect={onContentSelect}
          onSectionSelect={onSectionSelect}
        />
      </MaterialSidebarBody>
      
      <MaterialSidebarFooter>
        <SidebarFooterContent />
      </MaterialSidebarFooter>
    </MaterialSidebarContent>
  );
};

export function AircraftSidebar(props: AircraftSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <MaterialSidebar>
        <SidebarContentWrapper {...props} />
      </MaterialSidebar>

      {/* Mobile Sidebar Overlay */}
      <MaterialSidebarOverlay>
        <SidebarContentWrapper {...props} />
      </MaterialSidebarOverlay>
    </>
  );
}
