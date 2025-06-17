
"use client";

import { motion } from "framer-motion";
import { Plane, ChevronsUpDown, Settings, FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  return (
    <div className="flex h-[54px] w-full shrink-0 border-b p-2">
      <div className="mt-[1.5px] flex w-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="w-full" asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex w-fit items-center gap-2 px-2"
            >
              <Avatar className='rounded size-4'>
                <AvatarFallback>
                  <Plane className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <motion.li
                variants={variants}
                className="flex w-fit items-center gap-2"
              >
                {!isCollapsed && (
                  <>
                    <p className="text-sm font-medium">
                      AeroLearn Docs
                    </p>
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
                  </>
                )}
              </motion.li>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Documentation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
