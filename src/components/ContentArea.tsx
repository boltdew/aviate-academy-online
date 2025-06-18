
import { motion } from "framer-motion";
import { FileText, BookOpen, Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContentService } from "@/services/contentService";
import { LoadingScreen } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";

interface ContentAreaProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
}

export function ContentArea({ selectedContent }: ContentAreaProps) {
  console.log("🔄 ContentArea rendering with selectedContent:", selectedContent);

  return (
    <ErrorBoundary>
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-neutral-900">
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

function SpecificContentView({ selectedContent }: { selectedContent: { chapter: string; section: string; file: string } }) {
  console.log(`🎯 ContentService.getSpecificContent(${selectedContent.chapter}, ${selectedContent.section}, ${selectedContent.file})`);
  
  const content = ContentService.getSpecificContent(
    selectedContent.chapter,
    selectedContent.section,
    selectedContent.file
  );

  if (!content) {
    console.log("❌ Content not found");
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Not Found
            </CardTitle>
            <CardDescription>
              The requested content could not be loaded.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  console.log(`✅ Found specific content: ${content.slug}`);
  console.log(`📄 Displaying specific content: ${content.slug}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  ATA {selectedContent.chapter}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {selectedContent.section}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {content.title}
              </CardTitle>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Technical Documentation</span>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="p-6">
          <div 
            className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DashboardOverview() {
  const allContent = ContentService.getAllContent();
  console.log(`📖 ContentService.getAllContent() returning ${allContent.length} items`);
  console.log(`📚 Showing overview: ${allContent.length} items`);

  const stats = ContentService.getContentStats();
  console.log(`📊 Content stats: ${stats.totalItems} total, ${stats.totalChapters} chapters`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Aircraft Engineering Documentation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive technical documentation following ATA specifications
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Technical documents available
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ATA Chapters</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalChapters}</div>
              <p className="text-xs text-muted-foreground">
                System categories covered
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage</CardTitle>
              <Badge className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats.totalChapters / 50) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of ATA specification
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Available Documentation</CardTitle>
            <CardDescription>
              Select a document from the sidebar to begin reading
            </CardDescription>
          </CardHeader>
          <CardContent>
            {allContent.length > 0 ? (
              <div className="grid gap-3">
                {Object.entries(
                  allContent.reduce((acc, item) => {
                    if (!acc[item.chapter]) {
                      acc[item.chapter] = [];
                    }
                    acc[item.chapter].push(item);
                    return acc;
                  }, {} as Record<string, typeof allContent>)
                ).map(([chapter, items]) => (
                  <div key={chapter} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-mono">
                        ATA {chapter}
                      </Badge>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {items[0]?.chapterTitle || `Chapter ${chapter}`}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {items.length} document{items.length !== 1 ? 's' : ''} available
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No content available at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
