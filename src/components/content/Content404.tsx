
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Content404() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex items-center justify-center p-8"
    >
      <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-3xl max-w-md w-full">
        <CardHeader className="text-center p-8">
          <div className="w-16 h-16 bg-error-container rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-elevation-1">
            <AlertCircle className="h-8 w-8 text-error" />
          </div>
          <CardTitle className="text-2xl font-bold text-on-surface headline-medium">
            Content Not Found
          </CardTitle>
          <CardDescription className="text-on-surface-variant body-medium">
            The requested content could not be located. It may have been moved or doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0 text-center">
          <div className="space-y-4">
            <p className="text-sm text-on-surface-variant body-small">
              Please check the navigation menu or return to the dashboard to find the content you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="bg-primary-container text-primary border-primary hover:bg-primary hover:text-on-primary rounded-2xl px-6 py-2 transition-all duration-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
