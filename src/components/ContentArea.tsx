
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingScreen } from "@/components/ui/loading";
import { Suspense, useState, useEffect } from "react";
import { SpecificContentView } from "./content/SpecificContentView";
import { DashboardOverview } from "./content/DashboardOverview";
import { UserProfile } from "./user/UserProfile";
import { UserSettings } from "./user/UserSettings";
import { UserStats } from "./user/UserStats";

interface ContentAreaProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
}

export function ContentArea({ selectedContent }: ContentAreaProps) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  useEffect(() => {
    const handleUserFunctionSelected = (event: CustomEvent) => {
      setSelectedFunction(event.detail);
    };

    window.addEventListener('userFunctionSelected', handleUserFunctionSelected as EventListener);
    
    return () => {
      window.removeEventListener('userFunctionSelected', handleUserFunctionSelected as EventListener);
    };
  }, []);

  console.log("🔄 ContentArea rendering with:", { selectedContent, selectedFunction });

  const renderContent = () => {
    if (selectedFunction) {
      switch (selectedFunction) {
        case 'profile':
          return <UserProfile />;
        case 'settings':
          return <UserSettings />;
        case 'stats':
          return <UserStats />;
        default:
          return <DashboardOverview />;
      }
    }

    if (selectedContent) {
      return <SpecificContentView selectedContent={selectedContent} />;
    }

    return <DashboardOverview />;
  };

  return (
    <ErrorBoundary>
      <div className="flex-1 h-full bg-surface-container-lowest">
        <Suspense fallback={<LoadingScreen />}>
          {renderContent()}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
