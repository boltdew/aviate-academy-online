
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingScreen } from "@/components/ui/loading";
import { Suspense } from "react";
import { SpecificContentView } from "./content/SpecificContentView";
import { DashboardOverview } from "./content/DashboardOverview";

interface ContentAreaProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
}

export function ContentArea({ selectedContent }: ContentAreaProps) {
  console.log("🔄 ContentArea rendering with selectedContent:", selectedContent);

  return (
    <ErrorBoundary>
      <div className="flex-1 h-full bg-surface-container-lowest">
        <Suspense fallback={<LoadingScreen />}>
          {selectedContent ? (
            <SpecificContentView selectedContent={selectedContent} />
          ) : (
            <DashboardOverview />
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
