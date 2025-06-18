
"use client";

import { useState } from "react";
import { Search, Bell, User, Settings, Sun, Moon, Sparkles } from "lucide-react";
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
    <header className="flex items-center justify-between gap-6 px-8 py-4 border-b bg-surface-container border-outline shadow-elevation-2 flex-shrink-0 h-20">
      {/* Left Section - Brand */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2">
            <Sparkles className="h-5 w-5 text-on-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface title-large">
              AeroLearn Pro
            </h1>
            <p className="text-sm text-on-surface-variant body-small">
              Advanced Aircraft Engineering Platform
            </p>
          </div>
        </div>
      </div>

      {/* Center Section - Enhanced Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search aircraft systems, components, or procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 text-base bg-surface-container-high border-outline-variant rounded-3xl focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-lg px-2 py-1 text-xs">
                ⌘K
              </Badge>
            </div>
          </div>
        </form>
      </div>

      {/* Right Section - Enhanced Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="w-11 h-11 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
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
            className="w-11 h-11 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
          >
            <Bell className="h-5 w-5 text-on-surface" />
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-error text-on-error p-0 flex items-center justify-center text-xs shadow-elevation-1"
            >
              3
            </Badge>
          </Button>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-outline-variant"></div>

        {/* Enhanced User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-4 py-2 h-12 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elevation-1">
                <User className="h-4 w-4 text-on-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-on-surface">
                  {user?.fullName || "Alex Johnson"}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-on-surface-variant">
                    Premium Member
                  </p>
                  <Badge className="bg-tertiary text-on-tertiary px-2 py-0.5 rounded-lg text-xs">
                    Pro
                  </Badge>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 bg-surface-container border-outline shadow-elevation-3 rounded-3xl p-2"
          >
            <DropdownMenuLabel className="text-on-surface px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-on-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.fullName || "Alex Johnson"}</p>
                  <p className="text-xs text-on-surface-variant">{user?.emailAddresses?.[0]?.emailAddress || "alex@example.com"}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-outline-variant my-2" />
            <DropdownMenuItem 
              onClick={() => handleUserFunction('profile')}
              className="hover:bg-primary-container hover:text-on-primary-container rounded-2xl mx-1 px-3 py-2.5"
            >
              <User className="mr-3 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleUserFunction('stats')}
              className="hover:bg-secondary-container hover:text-on-secondary-container rounded-2xl mx-1 px-3 py-2.5"
            >
              <Settings className="mr-3 h-4 w-4" />
              Learning Analytics
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-outline-variant my-2" />
            <DropdownMenuItem className="hover:bg-error-container hover:text-on-error-container rounded-2xl mx-1 px-3 py-2.5">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
