
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState<{ chapter: string; section: string; file: string } | null>(null);

  return (
    <ErrorBoundary>
      <div className={cn("flex h-screen w-full bg-surface-container-lowest overflow-hidden")}>
        <AircraftSidebar 
          selectedContent={selectedContent}
          onContentSelect={setSelectedContent}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center gap-2 px-6 py-4 border-b bg-surface-container border-outline shadow-elevation-1 flex-shrink-0">
            <h1 className="text-xl font-semibold text-on-surface title-large">
              Aircraft Engineering Dashboard
            </h1>
          </header>
          <main className="flex-1 overflow-hidden">
            <ContentArea selectedContent={selectedContent} />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
