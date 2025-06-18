
"use client";

import { useState } from "react";
import { Search, Bell, User, Settings, Sun, Moon, Sparkles, Menu } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  onMenuToggle?: () => void;
  onSearch?: (query: string) => void;
  onUserFunctionSelect?: (func: string) => void;
}

export function AppHeader({ onMenuToggle, onSearch, onUserFunctionSelect }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUser();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      console.log("Searching for:", searchQuery.trim());
    }
  };

  const handleMobileSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      console.log("Mobile search for:", searchQuery.trim());
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleUserFunction = (func: string) => {
    onUserFunctionSelect?.(func);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b bg-surface-container border-outline shadow-elevation-2 flex-shrink-0 h-16 sm:h-20">
      {/* Left Section - Mobile Menu + Brand */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-initial">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-2xl hover:bg-primary-container lg:hidden flex-shrink-0"
          >
            <Menu className="h-5 w-5 text-on-surface" />
          </Button>
        )}
        
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2 flex-shrink-0">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-on-primary" />
          </div>
          {!isMobile && (
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-on-surface title-large">
                AeroLearn Pro
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant body-small hidden lg:block">
                Advanced Aircraft Engineering Platform
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Search (hidden on mobile) */}
      {!isMobile && (
        <div className="flex-1 max-w-md lg:max-w-2xl mx-4 lg:mx-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative group">
              <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search aircraft systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 lg:pl-12 pr-3 lg:pr-4 h-10 lg:h-12 text-sm lg:text-base bg-surface-container-high border-outline-variant rounded-2xl lg:rounded-3xl focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
              />
              <div className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-lg px-2 py-1 text-xs">
                  ⌘K
                </Badge>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Right Section - Actions */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
        {/* Mobile Search */}
        {isMobile && (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 h-8 text-sm rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && handleMobileSearch()}
            />
            <Button
              variant="ghost" 
              size="icon"
              onClick={handleMobileSearch}
              className="w-8 h-8 rounded-xl hover:bg-primary-container"
            >
              <Search className="h-4 w-4 text-on-surface" />
            </Button>
          </div>
        )}

        {/* Dark Mode Toggle - Hidden on mobile */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 lg:h-5 lg:w-5 text-on-surface" />
            ) : (
              <Moon className="h-4 w-4 lg:h-5 lg:w-5 text-on-surface" />
            )}
          </Button>
        )}

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
          >
            <Bell className="h-4 w-4 lg:h-5 lg:w-5 text-on-surface" />
            <Badge 
              className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-error text-on-error p-0 flex items-center justify-center text-xs shadow-elevation-1"
            >
              3
            </Badge>
          </Button>
        </div>

        {/* Divider - Hidden on mobile */}
        {!isMobile && <div className="w-px h-6 lg:h-8 bg-outline-variant"></div>}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-2 h-10 lg:h-12 rounded-2xl hover:bg-primary-container shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200",
                isMobile && "w-10 h-10 p-0"
              )}
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elevation-1 flex-shrink-0">
                <User className="h-4 w-4 text-on-primary" />
              </div>
              {!isMobile && (
                <div className="text-left hidden lg:block">
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
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 sm:w-64 bg-surface-container border-outline shadow-elevation-3 rounded-2xl lg:rounded-3xl p-2"
          >
            <DropdownMenuLabel className="text-on-surface px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-on-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{user?.fullName || "Alex Johnson"}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user?.emailAddresses?.[0]?.emailAddress || "alex@example.com"}</p>
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
            {isMobile && (
              <>
                <DropdownMenuSeparator className="bg-outline-variant my-2" />
                <DropdownMenuItem 
                  onClick={toggleDarkMode}
                  className="hover:bg-tertiary-container hover:text-on-tertiary-container rounded-2xl mx-1 px-3 py-2.5"
                >
                  {isDarkMode ? <Sun className="mr-3 h-4 w-4" /> : <Moon className="mr-3 h-4 w-4" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
              </>
            )}
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
