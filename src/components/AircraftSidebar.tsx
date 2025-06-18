
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
import { LayoutDashboard, Plane, User, Settings, BarChart3, Award, BookOpen } from "lucide-react";
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
            AeroLearn Pro
          </span>
          <span className="text-xs text-on-surface-variant body-small opacity-80">
            Advanced Engineering Platform
          </span>
        </div>
      )}
    </div>
  );
};

const NavigationSection = ({ 
  selectedContent, 
  selectedSection, 
  selectedFunction,
  onContentSelect, 
  onSectionSelect,
  onFunctionSelect 
}: {
  selectedContent: { chapter: string; section: string; file: string } | null;
  selectedSection?: { chapter: string; section: string } | null;
  selectedFunction: string | null;
  onContentSelect: (content: { chapter: string; section: string; file: string } | null) => void;
  onSectionSelect?: (section: { chapter: string; section: string } | null) => void;
  onFunctionSelect: (func: string) => void;
}) => {
  const { isOpen } = useMaterialSidebar();

  const mainLinks = [
    {
      label: "Dashboard Overview",
      icon: (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elevation-2">
          <LayoutDashboard className="text-on-primary h-4 w-4" />
        </div>
      ),
      onClick: () => {
        onFunctionSelect('');
        onContentSelect(null);
        if (onSectionSelect) onSectionSelect(null);
      },
      isActive: selectedFunction === '' && !selectedContent && !selectedSection
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

  return (
    <div className="space-y-8">
      {/* Main Navigation */}
      <div>
        {isOpen && (
          <div className="px-2 mb-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
              Main Navigation
            </h3>
          </div>
        )}
        <div className="space-y-2">
          {mainLinks.map((link, idx) => (
            <MaterialSidebarItem 
              key={idx}
              onClick={link.onClick}
              isActive={link.isActive}
            >
              {link.icon}
              {isOpen && (
                <span className="text-on-surface text-sm font-medium body-medium">
                  {link.label}
                </span>
              )}
            </MaterialSidebarItem>
          ))}
        </div>
      </div>

      {/* User Functions */}
      <div>
        {isOpen && (
          <div className="px-2 mb-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
              Personal Space
            </h3>
          </div>
        )}
        <div className="space-y-2">
          {userFunctions.map((func, idx) => (
            <MaterialSidebarItem
              key={idx}
              onClick={() => onFunctionSelect(func.function)}
              isActive={selectedFunction === func.function}
            >
              {func.icon}
              {isOpen && (
                <span className="text-on-surface text-sm font-medium body-medium">
                  {func.label}
                </span>
              )}
            </MaterialSidebarItem>
          ))}
        </div>
      </div>

      {/* Content Tree */}
      <div>
        {isOpen && (
          <div className="px-2 mb-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider label-small opacity-80">
              Learning Content
            </h3>
          </div>
        )}
        <HierarchicalContentTree 
          selectedContent={selectedContent}
          selectedSection={selectedSection}
          onContentSelect={(content) => {
            onFunctionSelect('');
            onContentSelect(content);
          }}
          onSectionSelect={(section) => {
            onFunctionSelect('');
            if (onSectionSelect) onSectionSelect(section);
          }}
        />
      </div>
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
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const handleFunctionSelect = (functionName: string) => {
    setSelectedFunction(functionName);
    onContentSelect(null);
    if (onSectionSelect) onSectionSelect(null);
    
    if (functionName) {
      window.dispatchEvent(new CustomEvent('userFunctionSelected', { detail: functionName }));
    }
  };

  return (
    <MaterialSidebarContent>
      <MaterialSidebarHeader>
        <SidebarLogo />
      </MaterialSidebarHeader>
      
      <MaterialSidebarBody>
        <NavigationSection
          selectedContent={selectedContent}
          selectedSection={selectedSection}
          selectedFunction={selectedFunction}
          onContentSelect={onContentSelect}
          onSectionSelect={onSectionSelect}
          onFunctionSelect={handleFunctionSelect}
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
