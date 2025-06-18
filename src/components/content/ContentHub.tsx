
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  PlayCircle,
  FileText,
  ChevronRight,
  Star
} from "lucide-react";

interface ContentHubProps {
  searchQuery?: string;
}

export function ContentHub({ searchQuery }: ContentHubProps) {
  const recentContent = [
    {
      id: 1,
      title: "Aircraft Electrical Systems",
      chapter: "24",
      progress: 75,
      timeLeft: "15 min",
      type: "reading"
    },
    {
      id: 2,
      title: "Hydraulic System Components",
      chapter: "29",
      progress: 40,
      timeLeft: "25 min",
      type: "video"
    },
    {
      id: 3,
      title: "Landing Gear Systems",
      chapter: "32",
      progress: 0,
      timeLeft: "30 min",
      type: "reading"
    }
  ];

  const featuredTopics = [
    {
      title: "Air Conditioning Systems",
      chapter: "21",
      description: "Learn about aircraft environmental control systems",
      difficulty: "Beginner",
      duration: "2.5 hours",
      rating: 4.8
    },
    {
      title: "Flight Controls",
      chapter: "27",
      description: "Understanding primary and secondary flight controls",
      difficulty: "Intermediate",
      duration: "3 hours",
      rating: 4.9
    },
    {
      title: "Hydraulic Power",
      chapter: "29",
      description: "Hydraulic system principles and maintenance",
      difficulty: "Advanced",
      duration: "4 hours",
      rating: 4.7
    }
  ];

  const quickStats = [
    { label: "Completed Chapters", value: "12", icon: BookOpen, color: "text-primary" },
    { label: "Study Hours", value: "47", icon: Clock, color: "text-secondary" },
    { label: "Certificates", value: "3", icon: Award, color: "text-tertiary" },
    { label: "Progress", value: "68%", icon: TrendingUp, color: "text-success" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto p-8 space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-on-surface headline-large">
          Learning Hub
        </h1>
        <p className="text-lg text-on-surface-variant body-large">
          Continue your aircraft engineering journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-on-surface headline-small">
                    {stat.value}
                  </p>
                  <p className="text-sm text-on-surface-variant body-small">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
            <PlayCircle className="h-6 w-6" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-6">
            {recentContent.map((content) => (
              <div
                key={content.id}
                className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant hover:shadow-elevation-1 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                  {content.type === 'video' ? (
                    <PlayCircle className="h-6 w-6 text-primary" />
                  ) : (
                    <FileText className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-secondary-container text-on-secondary-container rounded-xl">
                      ATA {content.chapter}
                    </Badge>
                    <span className="text-sm text-on-surface-variant">
                      {content.timeLeft} left
                    </span>
                  </div>
                  <h3 className="font-semibold text-on-surface body-large mb-2">
                    {content.title}
                  </h3>
                  <Progress value={content.progress} className="h-2" />
                </div>
                <ChevronRight className="h-5 w-5 text-on-surface-variant" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Topics */}
      <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
            <Star className="h-6 w-6" />
            Featured Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTopics.map((topic, index) => (
              <Card key={index} className="bg-surface-container-high border-outline-variant hover:shadow-elevation-2 transition-all cursor-pointer rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-tertiary-container text-on-tertiary-container border-tertiary rounded-xl">
                        ATA {topic.chapter}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-on-surface-variant">
                          {topic.rating}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface body-large mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant body-small mb-4">
                        {topic.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-on-surface-variant">
                      <span>{topic.difficulty}</span>
                      <span>{topic.duration}</span>
                    </div>
                    <Button className="w-full bg-primary text-on-primary hover:bg-primary/90 rounded-2xl">
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
