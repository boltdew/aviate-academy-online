
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
    <header className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 border-b bg-surface-container border-outline shadow-elevation-1 flex-shrink-0 h-16">
      {/* Left Section - Menu and Title */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden flex-shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-sm sm:text-xl font-semibold text-on-surface title-large truncate">
          <span className="hidden sm:inline">Aircraft Engineering Dashboard</span>
          <span className="sm:hidden">AeroLearn</span>
        </h1>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-on-surface-variant" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 sm:pl-10 pr-2 text-sm bg-surface-container-high border-outline-variant rounded-2xl focus:border-primary h-8 sm:h-10"
          />
        </form>
      </div>

      {/* Right Section - Actions and User Menu */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Dark Mode Toggle - Hidden on mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="hidden sm:flex rounded-2xl hover:bg-primary-container"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-on-surface" />
          ) : (
            <Moon className="h-5 w-5 text-on-surface" />
          )}
        </Button>

        {/* Notifications - Hidden on mobile */}
        <div className="relative hidden sm:block">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl hover:bg-primary-container"
          >
            <Bell className="h-5 w-5 text-on-surface" />
            <Badge 
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-error text-on-error p-0 flex items-center justify-center text-xs"
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
              className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-2xl hover:bg-primary-container"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-container flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="hidden lg:block text-left">
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
            className="w-48 sm:w-56 bg-surface-container border-outline shadow-elevation-2 rounded-2xl"
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
            {/* Mobile-only options */}
            <div className="sm:hidden">
              <DropdownMenuSeparator className="bg-outline-variant" />
              <DropdownMenuItem 
                onClick={toggleDarkMode}
                className="hover:bg-primary-container hover:text-on-primary-container rounded-xl mx-1"
              >
                {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
            </div>
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
