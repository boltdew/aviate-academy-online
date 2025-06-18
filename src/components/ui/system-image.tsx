
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SystemImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  type?: 'diagram' | 'schematic' | 'photo' | 'illustration';
}

export function SystemImage({ src, alt, caption, className, type = 'diagram' }: SystemImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'diagram': return 'bg-primary text-on-primary';
      case 'schematic': return 'bg-secondary text-on-secondary';
      case 'photo': return 'bg-tertiary text-on-tertiary';
      case 'illustration': return 'bg-surface-variant text-on-surface-variant';
      default: return 'bg-primary text-on-primary';
    }
  };

  if (hasError) {
    return (
      <Card className={cn("overflow-hidden rounded-2xl shadow-elevation-2 my-6", className)}>
        <div className="flex items-center justify-center h-48 bg-surface-container-high text-on-surface-variant">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm">Image not available</p>
            <p className="text-xs opacity-70">{alt}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden rounded-2xl shadow-elevation-2 my-6", className)}>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-auto transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
        <div className="absolute top-3 right-3">
          <Badge className={cn("text-xs px-2 py-1 rounded-lg shadow-elevation-1", getTypeColor(type))}>
            {type}
          </Badge>
        </div>
      </div>
      {caption && (
        <div className="p-4 bg-surface-container-high">
          <p className="text-sm text-on-surface-variant leading-relaxed">{caption}</p>
        </div>
      )}
    </Card>
  );
}
