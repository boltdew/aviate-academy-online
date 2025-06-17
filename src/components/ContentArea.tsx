import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Clock, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContentService } from "@/services/contentService";
import { useState, useMemo } from "react";
import type { MarkdownContent } from "@/types/content";

interface ContentAreaProps {
  selectedChapter: string | null;
}

export function ContentArea({ selectedChapter }: ContentAreaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const stats = ContentService.getContentStats();
  const availableChapters = ContentService.getAvailableChapters();
  
  const filteredContent = useMemo(() => {
    let content: MarkdownContent[] = [];
    
    if (selectedChapter) {
      content = ContentService.getContentByChapter(selectedChapter);
    } else if (searchQuery) {
      content = ContentService.searchContent(searchQuery);
    } else {
      content = ContentService.getAllContent().slice(0, 8); // Show first 8 for performance
    }
    
    return content;
  }, [searchQuery, selectedChapter]);

  return (
    <div className="flex-1 p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Learning Content</h2>
          <p className="text-slate-600">Access your comprehensive aircraft engineering materials organized by ATA chapters</p>
        </div>

        {/* Search and Filter Bar */}
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
          <div className="flex items-center gap-2">
            {selectedChapter && (
              <Badge variant="secondary" className="text-sm">
                Filtered by ATA {selectedChapter}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Cards */}
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
            <p className="text-slate-500 text-lg">No content found matching your criteria.</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Load More */}
        {!searchQuery && !selectedChapter && (
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
