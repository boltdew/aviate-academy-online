
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";
import { useState } from "react";

const Dashboard = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen flex-row">
      <AircraftSidebar 
        selectedChapter={selectedChapter}
        onChapterSelect={setSelectedChapter}
      />
      <main className="flex h-screen grow flex-col overflow-auto ml-12">
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-white">
          <h1 className="text-lg font-semibold text-slate-900">Aircraft Engineering Dashboard</h1>
        </div>
        <ContentArea selectedChapter={selectedChapter} />
      </main>
    </div>
  );
};

export default Dashboard;
