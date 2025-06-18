
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award, 
  Target,
  Calendar,
  BarChart3,
  Trophy
} from "lucide-react";

export function UserStats() {
  const overallStats = [
    {
      title: "Total Study Time",
      value: "32h 45m",
      description: "This month",
      icon: Clock,
      color: "bg-primary-container text-primary",
      trend: "+12%"
    },
    {
      title: "Chapters Completed",
      value: "8",
      description: "Out of 12 available",
      icon: BookOpen,
      color: "bg-secondary-container text-secondary",
      trend: "+25%"
    },
    {
      title: "Achievements",
      value: "15",
      description: "Badges earned",
      icon: Award,
      color: "bg-tertiary-container text-tertiary",
      trend: "+3"
    },
    {
      title: "Learning Streak",
      value: "7 days",
      description: "Current streak",
      icon: Target,
      color: "bg-surface-variant text-on-surface-variant",
      trend: "Active"
    }
  ];

  const chapterProgress = [
    { code: "21", title: "Air Conditioning", progress: 100, status: "Completed" },
    { code: "24", title: "Electrical Power", progress: 85, status: "In Progress" },
    { code: "27", title: "Flight Controls", progress: 60, status: "In Progress" },
    { code: "29", title: "Hydraulic Power", progress: 100, status: "Completed" },
    { code: "32", title: "Landing Gear", progress: 30, status: "Started" },
  ];

  const recentAchievements = [
    {
      title: "Quick Learner",
      description: "Completed a chapter in under 2 hours",
      date: "2 days ago",
      icon: Trophy
    },
    {
      title: "Consistent Student",
      description: "Studied for 7 consecutive days",
      date: "1 week ago",
      icon: Calendar
    },
    {
      title: "Chapter Master",
      description: "Scored 95% on Hydraulic Power quiz",
      date: "2 weeks ago",
      icon: Award
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-on-surface headline-large">
            Learning Statistics
          </h1>
          <p className="text-lg text-on-surface-variant body-large">
            Track your progress and achievements in aircraft engineering
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl hover:shadow-elevation-2 transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                  <CardTitle className="text-sm font-medium text-on-surface-variant body-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`h-8 w-8 rounded-2xl ${stat.color} flex items-center justify-center shadow-elevation-1`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="text-3xl font-bold text-on-surface headline-medium">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-on-surface-variant body-small">
                      {stat.description}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-xl text-xs"
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chapter Progress */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              Chapter Progress
            </CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Your progress across different ATA chapters
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              {chapterProgress.map((chapter) => (
                <div key={chapter.code} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                        <span className="text-sm font-bold text-primary">
                          {chapter.code}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-on-surface body-large">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant body-small">
                          ATA Chapter {chapter.code}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-on-surface">
                        {chapter.progress}%
                      </span>
                      <Badge 
                        variant={chapter.status === "Completed" ? "default" : "secondary"}
                        className={`px-3 py-1 rounded-xl ${
                          chapter.status === "Completed" 
                            ? "bg-primary text-on-primary" 
                            : "bg-secondary-container text-on-secondary-container"
                        }`}
                      >
                        {chapter.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={chapter.progress} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <Trophy className="h-6 w-6" />
              Recent Achievements
            </CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Your latest learning milestones and badges
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant"
                >
                  <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-on-surface body-large">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant body-small">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant body-small">
                    {achievement.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
