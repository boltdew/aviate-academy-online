
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
  Star,
  Calendar,
  Target
} from "lucide-react";

export function DashboardOverview() {
  const todaySchedule = [
    {
      time: "09:00",
      title: "Hydraulic Systems Review",
      chapter: "29",
      duration: "45 min"
    },
    {
      time: "11:00",
      title: "Electrical Systems Quiz",
      chapter: "24",
      duration: "30 min"
    },
    {
      time: "14:00",
      title: "Landing Gear Study",
      chapter: "32",
      duration: "60 min"
    }
  ];

  const achievements = [
    {
      title: "First Chapter Complete",
      description: "Completed your first ATA chapter",
      icon: Award,
      earned: true
    },
    {
      title: "Study Streak",
      description: "7 days of consistent learning",
      icon: Target,
      earned: true
    },
    {
      title: "Quick Learner",
      description: "Complete 5 chapters this month",
      icon: TrendingUp,
      earned: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto p-8 space-y-8"
    >
      {/* Welcome Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-on-surface headline-large">
          Welcome Back!
        </h1>
        <p className="text-lg text-on-surface-variant body-large">
          Ready to continue your aircraft engineering journey? Here's what's waiting for you.
        </p>
      </div>

      {/* Today's Schedule */}
      <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
            <Calendar className="h-6 w-6" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant"
              >
                <div className="w-16 text-center">
                  <span className="text-sm font-medium text-primary bg-primary-container px-3 py-1 rounded-xl">
                    {item.time}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-on-surface body-large">
                      {item.title}
                    </h3>
                    <Badge variant="secondary" className="bg-secondary-container text-on-secondary-container rounded-xl">
                      ATA {item.chapter}
                    </Badge>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Duration: {item.duration}
                  </p>
                </div>
                <Button size="sm" className="bg-primary text-on-primary hover:bg-primary/90 rounded-2xl">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Achievements */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <Award className="h-6 w-6" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${
                    achievement.earned
                      ? "bg-primary-container border-primary"
                      : "bg-surface-container-high border-outline-variant"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    achievement.earned 
                      ? "bg-primary text-on-primary" 
                      : "bg-surface-variant text-on-surface-variant"
                  }`}>
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={`font-semibold body-medium ${
                      achievement.earned ? "text-on-primary-container" : "text-on-surface"
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm body-small ${
                      achievement.earned ? "text-on-primary-container/80" : "text-on-surface-variant"
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-on-surface">Overall Progress</span>
                  <span className="text-sm text-on-surface-variant">68%</span>
                </div>
                <Progress value={68} className="h-3" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface-container-high rounded-2xl">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-on-surface-variant">Chapters</p>
                </div>
                <div className="text-center p-4 bg-surface-container-high rounded-2xl">
                  <p className="text-2xl font-bold text-secondary">47h</p>
                  <p className="text-sm text-on-surface-variant">Study Time</p>
                </div>
              </div>

              <Button className="w-full bg-primary text-on-primary hover:bg-primary/90 rounded-2xl">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
