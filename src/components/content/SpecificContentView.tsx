
import { motion } from "framer-motion";
import { Clock, User, BookOpen, Star, Award, TrendingUp, Calendar } from "lucide-react";
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
      transition={{ duration: 0.4 }}
      className="w-full h-full overflow-auto bg-surface-container-lowest"
    >
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Enhanced Header Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-3 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/15 via-secondary/10 to-tertiary/15 p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full -ml-24 -mb-24"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-4 flex-1 pr-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className="font-mono bg-primary text-on-primary px-4 py-2 rounded-2xl text-sm font-bold shadow-elevation-1">
                      ATA {selectedContent.chapter}
                    </Badge>
                    <Badge variant="outline" className="capitalize border-secondary text-secondary bg-secondary-container/30 px-4 py-2 rounded-2xl text-sm font-medium">
                      {selectedContent.section}
                    </Badge>
                    {content.difficulty && (
                      <Badge className={`px-4 py-2 rounded-2xl text-sm font-medium shadow-elevation-1 ${getDifficultyColor(content.difficulty)}`}>
                        {content.difficulty}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-4xl font-bold text-on-surface headline-large leading-tight">
                    {content.title}
                  </CardTitle>
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex-shrink-0 shadow-elevation-2">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              {/* Enhanced Metadata */}
              <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="flex items-center gap-3 p-4 bg-surface-container/50 rounded-2xl backdrop-blur-sm shadow-elevation-1">
                  <div className="w-10 h-10 bg-primary-container rounded-2xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Duration</p>
                    <p className="text-xs text-on-surface-variant">
                      {content.durationMinutes ? `${content.durationMinutes} min` : '15 min'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-surface-container/50 rounded-2xl backdrop-blur-sm shadow-elevation-1">
                  <div className="w-10 h-10 bg-secondary-container rounded-2xl flex items-center justify-center">
                    <User className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Type</p>
                    <p className="text-xs text-on-surface-variant">Technical Guide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-surface-container/50 rounded-2xl backdrop-blur-sm shadow-elevation-1">
                  <div className="w-10 h-10 bg-tertiary-container rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-tertiary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Progress</p>
                    <p className="text-xs text-on-surface-variant">Track Learning</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-surface-container/50 rounded-2xl backdrop-blur-sm shadow-elevation-1">
                  <div className="w-10 h-10 bg-surface-variant rounded-2xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">Updated</p>
                    <p className="text-xs text-on-surface-variant">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Content Card */}
        <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-10">
              <div 
                className="
                  prose prose-lg max-w-none
                  [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:text-on-surface [&>h1]:border-b [&>h1]:border-outline-variant [&>h1]:pb-4
                  [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-on-surface
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-on-surface
                  [&>h4]:text-lg [&>h4]:font-medium [&>h4]:mb-3 [&>h4]:mt-4 [&>h4]:text-on-surface
                  [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-on-surface [&>p]:text-base [&>p]:leading-7
                  [&>ul]:mb-4 [&>ul]:ml-6 [&>ol]:mb-4 [&>ol]:ml-6
                  [&>li]:mb-2 [&>li]:text-on-surface [&>li]:text-base
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:bg-primary-container/20 [&>blockquote]:rounded-r-2xl [&>blockquote]:text-on-surface [&>blockquote]:shadow-elevation-1
                  [&>code]:text-sm [&>code]:font-mono [&>code]:text-primary [&>code]:bg-primary-container [&>code]:px-2 [&>code]:py-1 [&>code]:rounded-lg
                  [&>pre]:p-6 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:bg-surface-container-high [&>pre]:border [&>pre]:border-outline-variant [&>pre]:text-sm [&>pre]:shadow-elevation-1
                  [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-outline-variant [&>table]:rounded-2xl [&>table]:overflow-hidden [&>table]:my-6 [&>table]:text-sm [&>table]:shadow-elevation-1
                  [&>table>thead>tr>th]:bg-surface-container-high [&>table>thead>tr>th]:text-on-surface [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:p-4 [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-outline-variant [&>table>thead>tr>th]:text-left
                  [&>table>tbody>tr>td]:p-4 [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-outline-variant [&>table>tbody>tr>td]:text-on-surface
                  [&>img]:rounded-2xl [&>img]:shadow-elevation-2 [&>img]:my-6 [&>img]:w-full [&>img]:h-auto
                  [&>strong]:text-on-surface [&>strong]:font-semibold
                  [&>em]:text-on-surface-variant [&>em]:italic
                  [&>a]:text-primary [&>a]:no-underline hover:[&>a]:text-primary/80 hover:[&>a]:underline [&>a]:font-medium
                "
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Related Content Footer */}
        <Card className="bg-surface-container border-outline shadow-elevation-2 rounded-3xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-2xl flex items-center justify-center shadow-elevation-1">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-on-surface mb-1">Continue Learning</h3>
                  <p className="text-sm text-on-surface-variant">
                    Explore more advanced topics in Chapter {selectedContent.chapter}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-secondary-container to-tertiary-container text-on-secondary-container border-secondary px-4 py-2 rounded-2xl text-sm font-medium shadow-elevation-1">
                  Chapter {selectedContent.chapter}
                </Badge>
                <Badge className="bg-primary text-on-primary px-4 py-2 rounded-2xl text-sm font-medium shadow-elevation-1">
                  Premium Content
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
