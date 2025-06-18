
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { AppHeader } from "@/components/layout/AppHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState<{ chapter: string; section: string; file: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<{ chapter: string; section: string } | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleContentSelected = (event: CustomEvent) => {
      setSelectedContent(event.detail);
      setSelectedSection(null);
      if (isMobile) setSidebarOpen(false);
    };

    const handleSectionSelected = (event: CustomEvent) => {
      setSelectedSection(event.detail);
      setSelectedContent(null);
      if (isMobile) setSidebarOpen(false);
    };

    window.addEventListener('contentSelected', handleContentSelected as EventListener);
    window.addEventListener('sectionSelected', handleSectionSelected as EventListener);
    
    return () => {
      window.removeEventListener('contentSelected', handleContentSelected as EventListener);
      window.removeEventListener('sectionSelected', handleSectionSelected as EventListener);
    };
  }, [isMobile]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleUserFunctionSelect = (func: string) => {
    setSelectedFunction(func);
    setSelectedContent(null);
    setSelectedSection(null);
    if (isMobile) setSidebarOpen(false);
    window.dispatchEvent(new CustomEvent('userFunctionSelected', { detail: func }));
  };

  const handleContentSelect = (content: { chapter: string; section: string; file: string } | null) => {
    setSelectedContent(content);
    setSelectedSection(null);
    setSelectedFunction(null);
    if (isMobile) setSidebarOpen(false);
  };

  const handleSectionSelect = (section: { chapter: string; section: string } | null) => {
    setSelectedSection(section);
    setSelectedContent(null);
    setSelectedFunction(null);
    if (isMobile) setSidebarOpen(false);
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
        <div className="flex flex-1 min-h-0 relative">
          {/* Mobile Sidebar Overlay */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div className={cn(
            "border-r border-outline bg-surface-container transition-all duration-300 ease-in-out z-50",
            isMobile ? (
              sidebarOpen 
                ? "fixed left-0 top-16 bottom-0 w-80 shadow-elevation-4" 
                : "hidden"
            ) : "w-80 flex-shrink-0 relative"
          )}>
            <AircraftSidebar 
              selectedContent={selectedContent}
              selectedSection={selectedSection}
              onContentSelect={handleContentSelect}
              onSectionSelect={handleSectionSelect}
            />
          </div>
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 overflow-hidden bg-surface-container-lowest",
            isMobile && "w-full"
          )}>
            <ContentArea 
              selectedContent={selectedContent}
              selectedSection={selectedSection}
              searchQuery={searchQuery}
            />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
