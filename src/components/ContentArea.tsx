
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Clock, Award } from "lucide-react";
import { Input } from "@/components/ui/input";

const sampleContent = [
  {
    id: 1,
    title: "Hydraulic System Fundamentals",
    chapter: "29",
    chapterTitle: "Hydraulic Power",
    description: "Understanding basic hydraulic principles, components, and system operations in aircraft applications.",
    duration: "45 min",
    difficulty: "Beginner",
    completed: false
  },
  {
    id: 2,
    title: "Landing Gear Operations",
    chapter: "32",
    chapterTitle: "Landing Gear",
    description: "Comprehensive guide to landing gear systems, retraction mechanisms, and troubleshooting procedures.",
    duration: "60 min",
    difficulty: "Intermediate",
    completed: true
  },
  {
    id: 3,
    title: "Engine Control Systems",
    chapter: "76",
    chapterTitle: "Engine Controls",
    description: "Advanced study of FADEC systems, fuel metering, and engine parameter monitoring.",
    duration: "75 min",
    difficulty: "Advanced",
    completed: false
  },
  {
    id: 4,
    title: "Electrical Power Distribution",
    chapter: "24",
    chapterTitle: "Electrical Power",
    description: "AC and DC power systems, generators, batteries, and electrical protection systems.",
    duration: "50 min",
    difficulty: "Intermediate",
    completed: false
  }
];

export function ContentArea() {
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
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,047</div>
              <p className="text-xs text-muted-foreground">Across all ATA chapters</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">7.6% progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sampleContent.map((content) => (
            <Card key={content.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        ATA {content.chapter}
                      </Badge>
                      <Badge 
                        variant={content.difficulty === 'Beginner' ? 'default' : 
                                content.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {content.difficulty}
                      </Badge>
                      {content.completed && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mb-1">{content.title}</CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      {content.chapterTitle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                  {content.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span>{content.duration}</span>
                  </div>
                  <Button size="sm" variant={content.completed ? "secondary" : "default"}>
                    {content.completed ? "Review" : "Start Learning"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Content
          </Button>
        </div>
      </div>
    </div>
  );
}
