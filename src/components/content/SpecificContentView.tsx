
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContentService } from "@/services/contentService";
import { Content404 } from "./Content404";

interface SpecificContentViewProps {
  selectedContent: { chapter: string; section: string; file: string };
}

export function SpecificContentView({ selectedContent }: SpecificContentViewProps) {
  console.log(`🎯 ContentService.getSpecificContent(${selectedContent.chapter}, ${selectedContent.section}, ${selectedContent.file})`);
  
  const content = ContentService.getSpecificContent(
    selectedContent.chapter,
    selectedContent.section,
    selectedContent.file
  );

  if (!content) {
    console.log("❌ Content not found");
    return <Content404 />;
  }

  console.log(`✅ Found specific content: ${content.slug}`);
  console.log(`📄 Displaying specific content: ${content.slug}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto"
    >
      <div className="max-w-5xl mx-auto p-8">
        <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-3xl">
          <CardHeader className="space-y-6 p-8">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-mono bg-secondary-container text-on-secondary-container px-4 py-2 rounded-2xl text-sm font-medium">
                    ATA {selectedContent.chapter}
                  </Badge>
                  <Badge variant="outline" className="capitalize border-outline text-on-surface-variant bg-surface-variant px-4 py-2 rounded-2xl text-sm">
                    {selectedContent.section}
                  </Badge>
                </div>
                <CardTitle className="text-4xl font-bold text-on-surface headline-large leading-tight">
                  {content.title}
                </CardTitle>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-on-surface-variant body-medium">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Technical Documentation</span>
              </div>
            </div>
          </CardHeader>
          
          <Separator className="bg-outline-variant mx-8" />
          
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none text-on-surface leading-relaxed"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
