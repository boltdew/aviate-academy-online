
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
      <div className="flex-1 overflow-auto bg-surface-container-lowest">
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
        <Card className="max-w-md bg-surface-container border-outline">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-on-surface">
              <FileText className="h-5 w-5" />
              Content Not Found
            </CardTitle>
            <CardDescription className="text-on-surface-variant">
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
      <Card className="bg-surface-container border-outline shadow-elevation-1">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono bg-secondary-container text-on-secondary-container">
                  ATA {selectedContent.chapter}
                </Badge>
                <Badge variant="outline" className="capitalize border-outline text-on-surface-variant bg-surface-variant">
                  {selectedContent.section}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-on-surface headline-large">
                {content.title}
              </CardTitle>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-on-surface-variant body-medium">
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
        
        <Separator className="bg-outline-variant" />
        
        <CardContent className="p-6">
          <div 
            className="prose prose-gray max-w-none text-on-surface body-large"
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
  console.log(`📊 Content stats: ${stats.totalContent} total, ${stats.chapters} chapters`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-on-surface headline-large mb-2">
            Aircraft Engineering Documentation
          </h2>
          <p className="text-on-surface-variant body-large">
            Comprehensive technical documentation following ATA specifications
          </p>
        </div>

        {/* Statistics Cards - Material 3 Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary-container border-outline shadow-elevation-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-on-primary-container label-large">Total Documents</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-on-primary-container display-small">{stats.totalContent}</div>
              <p className="text-xs text-on-primary-container/70 body-small">
                Technical documents available
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary-container border-outline shadow-elevation-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-on-secondary-container label-large">ATA Chapters</CardTitle>
              <BookOpen className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-on-secondary-container display-small">{stats.chapters}</div>
              <p className="text-xs text-on-secondary-container/70 body-small">
                System categories covered
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-tertiary-container border-outline shadow-elevation-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-on-tertiary-container label-large">Coverage</CardTitle>
              <div className="w-5 h-5 rounded-full bg-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-on-tertiary-container display-small">
                {Math.round((stats.chapters / 50) * 100)}%
              </div>
              <p className="text-xs text-on-tertiary-container/70 body-small">
                Of ATA specification
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Overview */}
        <Card className="bg-surface-container border-outline shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-on-surface headline-small">Available Documentation</CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Select a document from the sidebar to begin reading
            </CardDescription>
          </CardHeader>
          <CardContent>
            {allContent.length > 0 ? (
              <div className="grid gap-3">
                {Object.entries(
                  allContent.reduce((acc, item) => {
                    const chapterCode = item.slug.split('-')[0] || 'unknown';
                    if (!acc[chapterCode]) {
                      acc[chapterCode] = [];
                    }
                    acc[chapterCode].push(item);
                    return acc;
                  }, {} as Record<string, typeof allContent>)
                ).map(([chapter, items]) => (
                  <div key={chapter} className="border border-outline rounded-xl p-4 bg-surface-variant">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-mono bg-secondary-container text-on-secondary-container">
                        ATA {chapter}
                      </Badge>
                      <span className="font-medium text-on-surface-variant title-medium">
                        {items[0]?.title?.split(' ').slice(0, 3).join(' ') || `Chapter ${chapter}`}
                      </span>
                    </div>
                    <div className="text-sm text-on-surface-variant/70 body-small">
                      {items.length} document{items.length !== 1 ? 's' : ''} available
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-on-surface-variant">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="body-large">No content available at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
