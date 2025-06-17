
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Clock, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContentService } from "@/services/contentService";
import { useState, useMemo, useEffect } from "react";
import type { MarkdownContent } from "@/types/content";

interface ContentAreaProps {
  selectedChapter: string | null;
}

export function ContentArea({ selectedChapter }: ContentAreaProps) {
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
  const availableChapters = ContentService.getAvailableChapters();
  
  const filteredContent = useMemo(() => {
    console.log(`🔄 Filtering content with selectedChapter: ${selectedChapter}, searchQuery: "${searchQuery}"`);
    
    let content: MarkdownContent[] = [];
    
    // Priority: if a chapter is selected, show ONLY that chapter's content
    if (selectedChapter) {
      content = ContentService.getContentByChapter(selectedChapter);
      console.log(`📋 Showing content for chapter ${selectedChapter}: ${content.length} items`);
    } 
    // If searching but no chapter selected, show search results
    else if (searchQuery.trim()) {
      content = ContentService.searchContent(searchQuery);
      console.log(`🔍 Search results for "${searchQuery}": ${content.length} items`);
    } 
    // Default: show overview of all content (limited for performance)
    else {
      content = ContentService.getAllContent().slice(0, 8);
      console.log(`📚 Showing overview: ${content.length} items`);
    }
    
    return content;
  }, [searchQuery, selectedChapter]);

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
            {selectedChapter ? `ATA Chapter ${selectedChapter} Content` : 'Learning Content'}
          </h2>
          <p className="text-slate-600">
            {selectedChapter 
              ? `Browse all materials for ATA Chapter ${selectedChapter}` 
              : 'Access your comprehensive aircraft engineering materials organized by ATA chapters'
            }
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              placeholder={selectedChapter ? `Search within ATA ${selectedChapter}...` : "Search content, chapters, or topics..."} 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            {selectedChapter && (
              <Badge variant="secondary" className="text-sm">
                ATA Chapter {selectedChapter}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="outline" className="text-sm">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
        </div>

        {/* Show stats only when no specific chapter is selected */}
        {!selectedChapter && (
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

        {/* Debug Info */}
        <div className="mb-4 p-2 bg-blue-50 rounded text-sm">
          <p><strong>Debug:</strong> Selected: {selectedChapter || 'None'}, Search: "{searchQuery}", Results: {filteredContent.length}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredContent.map((content) => (
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

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              {selectedChapter 
                ? `No content found for ATA Chapter ${selectedChapter}.`
                : 'No content found matching your criteria.'
              }
            </p>
            <p className="text-slate-400 text-sm mt-2">
              {selectedChapter 
                ? 'Try selecting a different chapter from the sidebar.'
                : 'Try adjusting your search or filter.'
              }
            </p>
          </div>
        )}

        {/* Load More - only show when viewing all content */}
        {!searchQuery && !selectedChapter && filteredContent.length > 0 && (
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
