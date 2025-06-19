
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { AppHeader } from "@/components/layout/AppHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MaterialSidebarProvider } from "@/components/ui/material-sidebar";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState<{ chapter: string; section: string; file: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<{ chapter: string; section: string } | null>(null);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Initialize sidebar state based on device type
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleContentSelected = (event: CustomEvent) => {
      console.log('📖 Content selected:', event.detail);
      setSelectedContent(event.detail);
      setSelectedSection(null);
      setSelectedFunction(null);
      if (isMobile) setSidebarOpen(false);
    };

    const handleSectionSelected = (event: CustomEvent) => {
      console.log('📑 Section selected:', event.detail);
      setSelectedSection(event.detail);
      setSelectedContent(null);
      setSelectedFunction(null);
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
    console.log("🔍 Dashboard handleSearch called with:", query);
    setSearchQuery(query);
    // Clear selections when searching to show search results
    setSelectedContent(null);
    setSelectedSection(null);
    setSelectedFunction(null);
  };

  const handleUserFunctionSelect = (func: string) => {
    console.log("👤 User function selected:", func);
    setSelectedFunction(func);
    setSelectedContent(null);
    setSelectedSection(null);
    setSearchQuery(""); // Clear search when selecting user functions
    if (isMobile) setSidebarOpen(false);
    window.dispatchEvent(new CustomEvent('userFunctionSelected', { detail: func }));
  };

  const handleContentSelect = (content: { chapter: string; section: string; file: string } | null) => {
    console.log("📖 Content selection changed:", content);
    setSelectedContent(content);
    setSelectedSection(null);
    setSelectedFunction(null);
    setSearchQuery(""); // Clear search when selecting content
    if (isMobile) setSidebarOpen(false);
  };

  const handleSectionSelect = (section: { chapter: string; section: string } | null) => {
    console.log("📑 Section selection changed:", section);
    setSelectedSection(section);
    setSelectedContent(null);
    setSelectedFunction(null);
    setSearchQuery(""); // Clear search when selecting section
    if (isMobile) setSidebarOpen(false);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ErrorBoundary>
      <MaterialSidebarProvider isOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="flex flex-col h-screen w-full bg-surface-container-lowest overflow-hidden">
          <ErrorBoundary>
            <AppHeader 
              onSearch={handleSearch}
              onUserFunctionSelect={handleUserFunctionSelect}
              onMenuToggle={handleMenuToggle}
            />
          </ErrorBoundary>
          
          <div className="flex flex-1 min-h-0 relative">
            <ErrorBoundary>
              <AircraftSidebar 
                selectedContent={selectedContent}
                selectedSection={selectedSection}
                onContentSelect={handleContentSelect}
                onSectionSelect={handleSectionSelect}
              />
            </ErrorBoundary>
            
            <main className="flex-1 overflow-hidden bg-surface-container-lowest">
              <ErrorBoundary>
                <ContentArea 
                  selectedContent={selectedContent}
                  selectedSection={selectedSection}
                  searchQuery={searchQuery}
                />
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </MaterialSidebarProvider>
    </ErrorBoundary>
  );
};

export default Dashboard;
