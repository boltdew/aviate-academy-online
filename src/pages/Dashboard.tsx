
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
  };

  return (
    <ErrorBoundary>
      <div className={cn("flex flex-col h-screen w-full bg-surface-container-lowest overflow-hidden")}>
        <AppHeader 
          onSearch={handleSearch}
          onUserFunctionSelect={handleUserFunctionSelect}
        />
        <div className="flex flex-1 min-h-0">
          <AircraftSidebar 
            selectedContent={selectedContent}
            onContentSelect={handleContentSelect}
          />
          <main className="flex-1 overflow-hidden">
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
