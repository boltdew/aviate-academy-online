
"use client";

import { motion } from "framer-motion";
import { Settings, ChevronsUpDown, UserCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/clerk-react";

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

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer">
        <Settings className="h-4 w-4 shrink-0" />
        <motion.li variants={variants}>
          {!isCollapsed && (
            <p className="ml-2 text-sm">Settings</p>
          )}
        </motion.li>
      </div>
      
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="w-full">
            <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">
              <Avatar className="size-4">
                <AvatarFallback>
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <motion.li
                variants={variants}
                className="flex w-full items-center gap-2"
              >
                {!isCollapsed && (
                  <>
                    <p className="text-sm">
                      {user?.firstName || "User"}
                    </p>
                    <ChevronsUpDown className="ml-auto h-4 w-4 text-slate-400" />
                  </>
                )}
              </motion.li>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <div className="flex flex-row items-center gap-2 p-2">
              <Avatar className="size-6">
                <AvatarFallback>
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {user?.fullName || "User"}
                </span>
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {user?.emailAddresses[0]?.emailAddress || "user@aerolearn.com"}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
