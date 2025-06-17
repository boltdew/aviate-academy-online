
"use client";

import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <a
      href="/dashboard"
      className={cn(
        "flex h-7 w-full flex-row items-center rounded-md px-2 py-1.5 text-sm transition hover:bg-slate-100 hover:text-slate-900",
        pathname?.includes("dashboard") &&
          "bg-slate-100 text-slate-900 font-medium",
      )}
    >
      <LayoutDashboard className="h-4 w-4" />
      <motion.li variants={variants}>
        {!isCollapsed && (
          <p className="ml-2 text-sm">Dashboard</p>
        )}
      </motion.li>
    </a>
  );
}
