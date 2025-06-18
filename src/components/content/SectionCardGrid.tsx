
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, BookOpen, Star, ChevronRight, FileText, Award, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ContentService } from "@/services/contentService";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionCardGridProps {
  chapter: string;
  section: string;
  onContentSelect: (content: { chapter: string; section: string; file: string }) => void;
}

export function SectionCardGrid({ chapter, section, onContentSelect }: SectionCardGridProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Get section contents
  const contents = ContentService.getContentByChapterAndSection(chapter, section);
  const chapterTitle = ContentService.getContentStructure()[chapter]?.title || `Chapter ${chapter}`;

  if (contents.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 px-4">
        <div className="text-center">
          <FileText className="h-16 w-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-on-surface mb-2">No Content Available</h3>
          <p className="text-on-surface-variant">Content for this section is coming soon.</p>
        </div>
      </div>
    );
  }

  const handleCardClick = (content: any) => {
    if (expandedCard === content.id) {
      // If already expanded, navigate to content
      onContentSelect({
        chapter: content.ataChapter,
        section: content.subSection,
        file: content.slug
      });
    } else {
      // Expand the card
      setExpandedCard(content.id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-surface-variant text-on-surface-variant border-outline-variant';
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-elevation-2 flex-shrink-0">
              <BookOpen className="h-6 w-6 text-on-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <Badge className="font-mono bg-primary text-on-primary px-3 py-1 rounded-2xl text-sm font-bold">
                  ATA {chapter}
                </Badge>
                <Badge variant="outline" className="capitalize border-secondary text-secondary bg-secondary-container/30 px-3 py-1 rounded-2xl text-sm">
                  Section {section}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-on-surface headline-large">
                {chapterTitle} - Section {section}
              </h1>
              <p className="text-on-surface-variant body-large mt-2">
                {contents.length} technical documents available
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Card Grid */}
        <div className={cn(
          "grid gap-4 sm:gap-6",
          expandedCard ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {contents.map((content, index) => (
            <motion.div
              key={content.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "relative group cursor-pointer",
                expandedCard === content.id && "col-span-full"
              )}
              onMouseEnter={() => !isMobile && setHoveredCard(content.id)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onClick={() => handleCardClick(content)}
            >
              <Card className={cn(
                "bg-surface-container border-outline transition-all duration-300 overflow-hidden",
                "hover:shadow-elevation-3 hover:border-primary/30",
                expandedCard === content.id ? "shadow-elevation-4 border-primary/50 rounded-3xl" : "shadow-elevation-1 rounded-2xl",
                !isMobile && hoveredCard === content.id && "transform hover:-translate-y-1"
              )}>
                <CardContent className="p-0">
                  {/* Compact View */}
                  <AnimatePresence mode="wait">
                    {expandedCard !== content.id ? (
                      <motion.div
                        key="compact"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 sm:p-6"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <Badge className="font-mono bg-surface-variant text-on-surface-variant px-2 py-1 rounded-lg text-xs">
                                {chapter}-{section}-{content.slug.split('-').pop()}
                              </Badge>
                              {content.difficulty && (
                                <Badge className={`px-2 py-1 rounded-lg text-xs border ${getDifficultyColor(content.difficulty)}`}>
                                  {content.difficulty}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-on-surface title-large line-clamp-2 mb-2">
                              {content.title}
                            </h3>
                            <p className="text-sm text-on-surface-variant body-medium line-clamp-2">
                              Technical documentation for {content.title.toLowerCase()}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary-container rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-200">
                              <FileText className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-on-surface-variant" />
                              <span className="text-xs text-on-surface-variant">
                                {content.durationMinutes || 30}min
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-tertiary" />
                              <span className="text-xs text-on-surface-variant">Premium</span>
                            </div>
                          </div>
                          <ChevronRight className={cn(
                            "h-5 w-5 text-on-surface-variant transition-transform duration-200",
                            !isMobile && hoveredCard === content.id && "transform translate-x-1"
                          )} />
                        </div>
                      </motion.div>
                    ) : (
                      /* Expanded View */
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 sm:p-8"
                      >
                        {/* Enhanced Header */}
                        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/10 rounded-3xl p-4 sm:p-6 mb-6 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full -ml-12 -mb-12"></div>
                          </div>
                          <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                                  <Badge className="font-mono bg-primary text-on-primary px-3 py-1 rounded-2xl text-sm font-bold">
                                    {chapter}-{section}-{content.slug.split('-').pop()}
                                  </Badge>
                                  {content.difficulty && (
                                    <Badge className={`px-3 py-1 rounded-2xl text-sm border ${getDifficultyColor(content.difficulty)}`}>
                                      {content.difficulty}
                                    </Badge>
                                  )}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-on-surface headline-medium mb-2">
                                  {content.title}
                                </h2>
                                <p className="text-on-surface-variant body-large">
                                  Comprehensive technical documentation and procedures
                                </p>
                              </div>
                              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center flex-shrink-0">
                                <FileText className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Metadata Grid - Responsive */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                          <div className="bg-surface-container rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-container rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-on-surface">Duration</p>
                                <p className="text-xs text-on-surface-variant">{content.durationMinutes || 30} min</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-surface-container rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-container rounded-2xl flex items-center justify-center flex-shrink-0">
                                <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-on-surface">Level</p>
                                <p className="text-xs text-on-surface-variant">{content.difficulty}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-surface-container rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-tertiary-container rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-tertiary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-on-surface">Type</p>
                                <p className="text-xs text-on-surface-variant">Technical</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-surface-container rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-surface-variant rounded-2xl flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-on-surface-variant" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-on-surface">Progress</p>
                                <p className="text-xs text-on-surface-variant">Track</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="bg-surface-container rounded-2xl p-4 sm:p-6 mb-6">
                          <h3 className="text-lg font-semibold text-on-surface mb-3 title-medium">Content Preview</h3>
                          <div className="text-on-surface-variant body-medium line-clamp-4">
                            {content.content.replace(/<[^>]*>/g, '').substring(0, 300)}...
                          </div>
                        </div>

                        {/* Action Buttons - Responsive */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCard(null);
                            }}
                            className="px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors order-2 sm:order-1"
                          >
                            Collapse
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onContentSelect({
                                chapter: content.ataChapter,
                                section: content.subSection,
                                file: content.slug
                              });
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-2xl font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 flex items-center justify-center gap-2 order-1 sm:order-2"
                          >
                            <span>Read Full Content</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
