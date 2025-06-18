
import { motion } from "framer-motion";
import { Clock, User, BookOpen, Star } from "lucide-react";
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto"
    >
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-8">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="space-y-3 sm:space-y-4 flex-1 pr-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Badge variant="secondary" className="font-mono bg-primary text-on-primary px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium">
                    ATA {selectedContent.chapter}
                  </Badge>
                  <Badge variant="outline" className="capitalize border-outline text-on-surface-variant bg-surface-variant px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                    {selectedContent.section}
                  </Badge>
                  {content.difficulty && (
                    <Badge className={`px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium ${getDifficultyColor(content.difficulty)}`}>
                      {content.difficulty}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl sm:text-3xl md:text-4xl font-bold text-on-surface headline-small sm:headline-large leading-tight">
                  {content.title}
                </CardTitle>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-xl sm:rounded-2xl flex-shrink-0">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-on-surface-variant body-small sm:body-medium flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>
                  {content.durationMinutes ? `${content.durationMinutes} min read` : 'Quick read'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Technical Documentation</span>
                <span className="sm:hidden">Tech Doc</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Last updated: {new Date().toLocaleDateString()}</span>
                <span className="sm:hidden">Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 sm:p-8">
              <div 
                className="
                  prose prose-sm sm:prose-lg max-w-none
                  [&>h1]:text-xl sm:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 sm:[&>h1]:mb-6 [&>h1]:mt-6 sm:[&>h1]:mt-8 [&>h1]:text-on-surface [&>h1]:border-b [&>h1]:border-outline-variant [&>h1]:pb-2 sm:[&>h1]:pb-3
                  [&>h2]:text-lg sm:[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 sm:[&>h2]:mb-4 [&>h2]:mt-6 sm:[&>h2]:mt-8 [&>h2]:text-on-surface
                  [&>h3]:text-base sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-2 sm:[&>h3]:mb-3 [&>h3]:mt-4 sm:[&>h3]:mt-6 [&>h3]:text-on-surface
                  [&>h4]:text-sm sm:[&>h4]:text-lg [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:mt-3 sm:[&>h4]:mt-4 [&>h4]:text-on-surface
                  [&>p]:mb-3 sm:[&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-on-surface [&>p]:text-sm sm:[&>p]:text-base
                  [&>ul]:mb-3 sm:[&>ul]:mb-4 [&>ul]:ml-4 sm:[&>ul]:ml-6 [&>ol]:mb-3 sm:[&>ol]:mb-4 [&>ol]:ml-4 sm:[&>ol]:ml-6
                  [&>li]:mb-1 sm:[&>li]:mb-2 [&>li]:text-on-surface [&>li]:text-sm sm:[&>li]:text-base
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 sm:[&>blockquote]:pl-6 [&>blockquote]:py-3 sm:[&>blockquote]:py-4 [&>blockquote]:my-4 sm:[&>blockquote]:my-6 [&>blockquote]:bg-primary-container/10 [&>blockquote]:rounded-r-lg [&>blockquote]:text-on-surface
                  [&>code]:text-xs sm:[&>code]:text-sm [&>code]:font-mono [&>code]:text-primary [&>code]:bg-primary-container [&>code]:px-1.5 sm:[&>code]:px-2 [&>code]:py-0.5 sm:[&>code]:py-1 [&>code]:rounded-md sm:[&>code]:rounded-lg
                  [&>pre]:p-3 sm:[&>pre]:p-4 [&>pre]:rounded-lg sm:[&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:bg-surface-container-high [&>pre]:border [&>pre]:border-outline-variant [&>pre]:text-sm
                  [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-outline-variant [&>table]:rounded-lg [&>table]:overflow-hidden [&>table]:my-4 sm:[&>table]:my-6 [&>table]:text-xs sm:[&>table]:text-sm
                  [&>table>thead>tr>th]:bg-surface-container-high [&>table>thead>tr>th]:text-on-surface [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:p-2 sm:[&>table>thead>tr>th]:p-3 [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-outline-variant [&>table>thead>tr>th]:text-left
                  [&>table>tbody>tr>td]:p-2 sm:[&>table>tbody>tr>td]:p-3 [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-outline-variant [&>table>tbody>tr>td]:text-on-surface
                  [&>img]:rounded-lg sm:[&>img]:rounded-xl [&>img]:shadow-elevation-1 [&>img]:my-4 sm:[&>img]:my-6 [&>img]:w-full [&>img]:h-auto
                  [&>strong]:text-on-surface [&>strong]:font-semibold
                  [&>em]:text-on-surface-variant [&>em]:italic
                  [&>a]:text-primary [&>a]:no-underline hover:[&>a]:text-primary/80 hover:[&>a]:underline
                "
                style={{
                  fontSize: window.innerWidth < 640 ? '0.875rem' : '1.125rem',
                  lineHeight: window.innerWidth < 640 ? '1.5' : '1.75',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Related Content Footer */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-2xl sm:rounded-3xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-on-surface mb-1 sm:mb-2">Related Topics</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Explore more content in Chapter {selectedContent.chapter}
                </p>
              </div>
              <Badge variant="outline" className="bg-secondary-container text-on-secondary-container border-secondary px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                Chapter {selectedContent.chapter}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
