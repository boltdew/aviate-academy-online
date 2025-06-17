
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Clock, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContentService } from "@/services/contentService";
import { useState, useMemo, useEffect } from "react";
import type { MarkdownContent } from "@/types/content";

interface ContentAreaProps {
  selectedContent: { chapter: string; section: string; file: string } | null;
}

export function ContentArea({ selectedContent }: ContentAreaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Ensure content is initialized
  useEffect(() => {
    const initContent = async () => {
      await ContentService.ensureInitialized();
      setIsLoading(false);
    };
    initContent();
  }, []);
  
  const stats = ContentService.getContentStats();
  
  const displayContent = useMemo(() => {
    console.log(`🔄 ContentArea rendering with selectedContent:`, selectedContent);
    
    // If specific content is selected, show only that content
    if (selectedContent) {
      const specificContent = ContentService.getSpecificContent(
        selectedContent.chapter, 
        selectedContent.section, 
        selectedContent.file
      );
      
      if (specificContent) {
        console.log(`📄 Displaying specific content: ${specificContent.title}`);
        return [specificContent];
      } else {
        console.log(`❌ Specific content not found`);
        return [];
      }
    }
    
    // If searching, show search results
    if (searchQuery.trim()) {
      const results = ContentService.searchContent(searchQuery);
      console.log(`🔍 Search results for "${searchQuery}": ${results.length} items`);
      return results;
    }
    
    // Default: show overview of all content (limited for performance)
    const allContent = ContentService.getAllContent().slice(0, 8);
    console.log(`📚 Showing overview: ${allContent.length} items`);
    return allContent;
  }, [selectedContent, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {selectedContent 
              ? `ATA Chapter ${selectedContent.chapter} - ${displayContent[0]?.title || 'Content'}` 
              : 'Learning Content'
            }
          </h2>
          <p className="text-slate-600">
            {selectedContent 
              ? `Viewing specific content from ATA Chapter ${selectedContent.chapter}` 
              : 'Access your comprehensive aircraft engineering materials organized by ATA chapters'
            }
          </p>
        </div>

        {/* Search Bar - only show when no specific content is selected */}
        {!selectedContent && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                placeholder="Search content, chapters, or topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <Badge variant="outline" className="text-sm">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
        )}

        {/* Show stats only when no specific content is selected */}
        {!selectedContent && !searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalContent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across {stats.chapters} ATA chapters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Beginner Content</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.difficulties.Beginner || 0}</div>
                <p className="text-xs text-muted-foreground">Easy to start modules</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Advanced Content</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.difficulties.Advanced || 0}</div>
                <p className="text-xs text-muted-foreground">Expert level modules</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Display */}
        {selectedContent && displayContent.length > 0 ? (
          // Single content view
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-sm">
                  ATA {displayContent[0].ataChapter}
                </Badge>
                {displayContent[0].subSection && (
                  <Badge variant="outline" className="text-sm">
                    {displayContent[0].subSection}
                  </Badge>
                )}
                {displayContent[0].difficulty && (
                  <Badge 
                    variant={displayContent[0].difficulty === 'Beginner' ? 'default' : 
                            displayContent[0].difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    className="text-sm"
                  >
                    {displayContent[0].difficulty}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {displayContent[0].title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{displayContent[0].durationMinutes ? `${displayContent[0].durationMinutes} min` : 'Self-paced'}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {displayContent[0].content}
              </div>
            </div>
          </div>
        ) : (
          // Grid view for multiple contents
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayContent.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          ATA {content.ataChapter}
                        </Badge>
                        {content.subSection && (
                          <Badge variant="outline" className="text-xs">
                            {content.subSection}
                          </Badge>
                        )}
                        {content.difficulty && (
                          <Badge 
                            variant={content.difficulty === 'Beginner' ? 'default' : 
                                    content.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {content.difficulty}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-1">{content.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-600">
                        {content.subSection || `ATA Chapter ${content.ataChapter}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 mb-4 leading-relaxed line-clamp-3">
                    {content.content.substring(0, 200)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{content.durationMinutes ? `${content.durationMinutes} min` : 'Self-paced'}</span>
                    </div>
                    <Button size="sm">
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {displayContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              {selectedContent 
                ? `No content found for the selected item.`
                : 'No content found matching your criteria.'
              }
            </p>
            <p className="text-slate-400 text-sm mt-2">
              {selectedContent 
                ? 'Try selecting a different item from the sidebar.'
                : 'Try adjusting your search or filter.'
              }
            </p>
          </div>
        )}

        {/* Load More - only show when viewing all content */}
        {!searchQuery && !selectedContent && displayContent.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
