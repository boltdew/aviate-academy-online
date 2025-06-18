
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry?: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const retry = () => {
        this.setState({ hasError: false, error: undefined });
      };

      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={retry} />;
      }

      return <DefaultErrorFallback error={this.state.error} retry={retry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, retry }: { error?: Error; retry?: () => void }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px] p-6">
      <Alert className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || "An unexpected error occurred. Please try again."}
          </p>
          {retry && (
            <Button
              onClick={retry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="h-3 w-3" />
              Try again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
