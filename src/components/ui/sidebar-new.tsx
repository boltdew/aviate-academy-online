
"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebarNew = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarNew must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(true); // Default to open for desktop

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarNew = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <DesktopSidebar className={className} {...props}>{children}</DesktopSidebar>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, setOpen, animate } = useSidebarNew();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-6 flex flex-col bg-surface-container w-[320px] flex-shrink-0 shadow-elevation-2",
        className
      )}
      animate={{
        width: animate ? (open ? "320px" : "80px") : "320px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { open, animate } = useSidebarNew();
  return (
    <div
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 px-4 rounded-2xl hover:bg-primary-container transition-all duration-300 cursor-pointer shadow-elevation-1 hover:shadow-elevation-2",
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        {link.icon}
      </div>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-on-surface text-sm group-hover/sidebar:text-on-primary-container transition duration-300 whitespace-pre inline-block !p-0 !m-0 body-medium truncate font-medium"
      >
        {link.label}
      </motion.span>
    </div>
  );
};
