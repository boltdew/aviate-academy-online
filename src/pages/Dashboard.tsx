
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { AppHeader } from "@/components/layout/AppHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState<{ chapter: string; section: string; file: string } | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleUserFunctionSelect = (func: string) => {
    setSelectedFunction(func);
    setSelectedContent(null);
    // Dispatch custom event for sidebar to pick up
    window.dispatchEvent(new CustomEvent('userFunctionSelected', { detail: func }));
  };

  const handleContentSelect = (content: { chapter: string; section: string; file: string } | null) => {
    setSelectedContent(content);
    setSelectedFunction(null);
    // Close mobile sidebar when content is selected
    setSidebarOpen(false);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ErrorBoundary>
      <div className={cn("flex flex-col h-screen w-full bg-surface-container-lowest overflow-hidden")}>
        <AppHeader 
          onSearch={handleSearch}
          onUserFunctionSelect={handleUserFunctionSelect}
          onMenuToggle={handleMenuToggle}
        />
        <div className="flex flex-1 min-h-0">
          {/* Sidebar - Fixed width, no responsive behavior */}
          <div className="w-[320px] flex-shrink-0 border-r border-outline bg-surface-container">
            <AircraftSidebar 
              selectedContent={selectedContent}
              onContentSelect={handleContentSelect}
            />
          </div>
          
          {/* Main Content - Takes remaining space */}
          <main className="flex-1 overflow-hidden bg-surface-container-lowest">
            <ContentArea 
              selectedContent={selectedContent}
              searchQuery={searchQuery}
            />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
