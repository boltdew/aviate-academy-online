
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingScreen({ message = "Loading...", size = "md" }: LoadingScreenProps) {
  const sizeClasses = {
    sm: "h-32",
    md: "h-64",
    lg: "h-96"
  };

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} px-4`}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-elevation-2">
            <Plane className={`${iconSizes[size]} text-on-primary`} />
          </div>
        </motion.div>
        <p className="text-on-surface-variant text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={`animate-spin border-2 border-primary border-t-transparent rounded-full ${sizeClasses[size]} ${className}`} />
  );
}
