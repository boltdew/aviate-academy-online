
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
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary" className="font-mono bg-primary text-on-primary px-4 py-2 rounded-2xl text-sm font-medium">
                    ATA {selectedContent.chapter}
                  </Badge>
                  <Badge variant="outline" className="capitalize border-outline text-on-surface-variant bg-surface-variant px-4 py-2 rounded-2xl text-sm">
                    {selectedContent.section}
                  </Badge>
                  {content.difficulty && (
                    <Badge className={`px-4 py-2 rounded-2xl text-sm font-medium ${getDifficultyColor(content.difficulty)}`}>
                      {content.difficulty}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-on-surface headline-large leading-tight">
                  {content.title}
                </CardTitle>
              </div>
              <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-on-surface-variant body-medium flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {content.durationMinutes ? `${content.durationMinutes} min read` : 'Quick read'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Technical Documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="prose prose-lg max-w-none p-8 prose-headings:text-on-surface prose-p:text-on-surface prose-strong:text-on-surface prose-em:text-on-surface-variant prose-code:text-primary prose-code:bg-primary-container prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-pre:bg-surface-container-high prose-pre:border prose-pre:border-outline-variant prose-blockquote:border-l-primary prose-blockquote:bg-primary-container/20 prose-blockquote:text-on-surface prose-a:text-primary hover:prose-a:text-primary/80"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              <style jsx>{`
                .prose h1 {
                  @apply text-3xl font-bold mb-6 mt-8 text-on-surface border-b border-outline-variant pb-3;
                }
                .prose h2 {
                  @apply text-2xl font-semibold mb-4 mt-8 text-on-surface;
                }
                .prose h3 {
                  @apply text-xl font-semibold mb-3 mt-6 text-on-surface;
                }
                .prose h4 {
                  @apply text-lg font-medium mb-2 mt-4 text-on-surface;
                }
                .prose p {
                  @apply mb-4 leading-relaxed text-on-surface;
                }
                .prose ul, .prose ol {
                  @apply mb-4 ml-6;
                }
                .prose li {
                  @apply mb-2 text-on-surface;
                }
                .prose blockquote {
                  @apply border-l-4 border-primary pl-6 py-4 my-6 bg-primary-container/10 rounded-r-lg;
                }
                .prose code {
                  @apply text-sm font-mono;
                }
                .prose pre {
                  @apply p-4 rounded-xl overflow-x-auto;
                }
                .prose table {
                  @apply w-full border-collapse border border-outline-variant rounded-lg overflow-hidden my-6;
                }
                .prose th {
                  @apply bg-surface-container-high text-on-surface font-semibold p-3 border-b border-outline-variant text-left;
                }
                .prose td {
                  @apply p-3 border-b border-outline-variant text-on-surface;
                }
                .prose img {
                  @apply rounded-xl shadow-elevation-1 my-6;
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
          </CardContent>
        </Card>

        {/* Related Content Footer */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">Related Topics</h3>
                <p className="text-sm text-on-surface-variant">
                  Explore more content in Chapter {selectedContent.chapter}
                </p>
              </div>
              <Badge variant="outline" className="bg-secondary-container text-on-secondary-container border-secondary px-4 py-2 rounded-2xl">
                Chapter {selectedContent.chapter}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
