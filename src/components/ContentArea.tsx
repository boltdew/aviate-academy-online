
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingScreen } from "@/components/ui/loading";
import { Suspense, useState, useEffect } from "react";
import { SpecificContentView } from "./content/SpecificContentView";
import { ContentHub } from "./content/ContentHub";
import { SectionCardGrid } from "./content/SectionCardGrid";
import { UserProfile } from "./user/UserProfile";
import { UserSettings } from "./user/UserSettings";
import { UserStats } from "./user/UserStats";

interface ContentAreaProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
  selectedSection?: { chapter: string; section: string } | null;
  searchQuery?: string;
}

export function ContentArea({ selectedContent, selectedSection, searchQuery }: ContentAreaProps) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  useEffect(() => {
    const handleUserFunctionSelected = (event: CustomEvent) => {
      setSelectedFunction(event.detail);
    };

    const handleSectionSelected = (event: CustomEvent) => {
      setSelectedFunction(null);
    };

    window.addEventListener('userFunctionSelected', handleUserFunctionSelected as EventListener);
    window.addEventListener('sectionSelected', handleSectionSelected as EventListener);
    
    return () => {
      window.removeEventListener('userFunctionSelected', handleUserFunctionSelected as EventListener);
      window.removeEventListener('sectionSelected', handleSectionSelected as EventListener);
    };
  }, []);

  console.log("🔄 ContentArea rendering with:", { selectedContent, selectedSection, selectedFunction, searchQuery });

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
          return <ContentHub searchQuery={searchQuery} />;
      }
    }

    if (selectedContent) {
      return <SpecificContentView selectedContent={selectedContent} />;
    }

    if (selectedSection) {
      return (
        <SectionCardGrid 
          chapter={selectedSection.chapter}
          section={selectedSection.section}
          onContentSelect={(content) => {
            // This will trigger content selection in the parent component
            window.dispatchEvent(new CustomEvent('contentSelected', { detail: content }));
          }}
        />
      );
    }

    return <ContentHub searchQuery={searchQuery} />;
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
