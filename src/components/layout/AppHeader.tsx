
"use client";

import { useState } from "react";
import { Search, Menu, Bell, User, Settings, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  onMenuToggle?: () => void;
  onSearch?: (query: string) => void;
  onUserFunctionSelect?: (func: string) => void;
}

export function AppHeader({ onMenuToggle, onSearch, onUserFunctionSelect }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleUserFunction = (func: string) => {
    onUserFunctionSelect?.(func);
  };

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 border-b bg-surface-container border-outline shadow-elevation-1 flex-shrink-0">
      {/* Left Section - Menu and Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-on-surface title-large">
          Aircraft Engineering Dashboard
        </h1>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <Input
            type="text"
            placeholder="Search content, chapters, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-surface-container-high border-outline-variant rounded-2xl focus:border-primary"
          />
        </form>
      </div>

      {/* Right Section - Actions and User Menu */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-2xl hover:bg-primary-container"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-on-surface" />
          ) : (
            <Moon className="h-5 w-5 text-on-surface" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl hover:bg-primary-container"
          >
            <Bell className="h-5 w-5 text-on-surface" />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-error text-on-error p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-primary-container"
            >
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-on-surface">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-on-surface-variant">
                  Premium Member
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-surface-container border-outline shadow-elevation-2 rounded-2xl"
          >
            <DropdownMenuLabel className="text-on-surface">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-outline-variant" />
            <DropdownMenuItem 
              onClick={() => handleUserFunction('profile')}
              className="hover:bg-primary-container hover:text-on-primary-container rounded-xl mx-1"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleUserFunction('stats')}
              className="hover:bg-primary-container hover:text-on-primary-container rounded-xl mx-1"
            >
              <Settings className="mr-2 h-4 w-4" />
              Statistics
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleUserFunction('settings')}
              className="hover:bg-primary-container hover:text-on-primary-container rounded-xl mx-1"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-outline-variant" />
            <DropdownMenuItem className="hover:bg-error-container hover:text-on-error-container rounded-xl mx-1">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
