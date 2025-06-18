
"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MaterialSidebarContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const MaterialSidebarContext = createContext<MaterialSidebarContextProps | undefined>(undefined);

export const useMaterialSidebar = () => {
  const context = useContext(MaterialSidebarContext);
  if (!context) {
    throw new Error("useMaterialSidebar must be used within MaterialSidebarProvider");
  }
  return context;
};

interface MaterialSidebarProviderProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const MaterialSidebarProvider = ({ 
  children, 
  isOpen: controlledIsOpen, 
  onOpenChange 
}: MaterialSidebarProviderProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  return (
    <MaterialSidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </MaterialSidebarContext.Provider>
  );
};

interface MaterialSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebar = ({ children, className }: MaterialSidebarProps) => {
  const { isOpen, isMobile } = useMaterialSidebar();

  if (isMobile) {
    return null; // Mobile sidebar is handled by overlay
  }

  return (
    <aside
      className={cn(
        "bg-surface-container border-r border-outline transition-all duration-300 ease-out relative",
        isOpen ? "w-80 xl:w-96" : "w-16",
        className
      )}
    >
      {children}
    </aside>
  );
};

interface MaterialSidebarOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebarOverlay = ({ children, className }: MaterialSidebarOverlayProps) => {
  const { isOpen, setIsOpen, isMobile } = useMaterialSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 bg-surface-container border-r border-outline z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0 w-72 sm:w-80" : "-translate-x-full w-0",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
};

interface MaterialSidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebarContent = ({ children, className }: MaterialSidebarContentProps) => {
  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      {children}
    </div>
  );
};

interface MaterialSidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebarHeader = ({ children, className }: MaterialSidebarHeaderProps) => {
  return (
    <div className={cn("flex-shrink-0 p-6", className)}>
      {children}
    </div>
  );
};

interface MaterialSidebarBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebarBody = ({ children, className }: MaterialSidebarBodyProps) => {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6", className)}>
      {children}
    </div>
  );
};

interface MaterialSidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const MaterialSidebarFooter = ({ children, className }: MaterialSidebarFooterProps) => {
  return (
    <div className={cn("flex-shrink-0 p-4 border-t border-outline-variant", className)}>
      {children}
    </div>
  );
};

interface MaterialSidebarItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const MaterialSidebarItem = ({ 
  children, 
  onClick, 
  isActive = false, 
  className 
}: MaterialSidebarItemProps) => {
  const { isOpen } = useMaterialSidebar();

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200",
        "hover:bg-primary-container hover:shadow-elevation-1",
        isActive && "bg-primary-container shadow-elevation-2",
        !isOpen && "justify-center px-2",
        className
      )}
    >
      {children}
    </div>
  );
};
