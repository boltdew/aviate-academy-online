
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState<{ chapter: string; section: string; file: string } | null>(null);

  return (
    <div className={cn("flex h-screen w-full bg-gray-50 dark:bg-neutral-900 overflow-hidden")}>
      <AircraftSidebar 
        selectedContent={selectedContent}
        onContentSelect={setSelectedContent}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 px-6 py-4 border-b bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 flex-shrink-0">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Aircraft Engineering Dashboard</h1>
        </div>
        <div className="flex-1 overflow-hidden">
          <ContentArea selectedContent={selectedContent} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
