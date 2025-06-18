
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, TrendingUp } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Chapters",
      value: "5",
      description: "Aircraft systems covered",
      icon: BookOpen,
      color: "bg-primary-container text-primary"
    },
    {
      title: "Study Time",
      value: "185min",
      description: "Estimated total duration",
      icon: Clock,
      color: "bg-secondary-container text-secondary"
    },
    {
      title: "Active Users",
      value: "1,234",
      description: "Learning aircraft systems",
      icon: Users,
      color: "bg-tertiary-container text-tertiary"
    },
    {
      title: "Progress",
      value: "67%",
      description: "Course completion rate",
      icon: TrendingUp,
      color: "bg-surface-variant text-on-surface-variant"
    }
  ];

  const recentChapters = [
    { code: "21", title: "Air Conditioning", difficulty: "Beginner" },
    { code: "27", title: "Flight Controls", difficulty: "Intermediate" },
    { code: "29", title: "Hydraulic Power", difficulty: "Beginner" },
    { code: "32", title: "Landing Gear", difficulty: "Intermediate" }
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
            Aircraft Engineering Dashboard
          </h1>
          <p className="text-lg text-on-surface-variant body-large">
            Master aircraft systems with comprehensive ATA chapter coverage
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
                  <p className="text-xs text-on-surface-variant body-small mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Chapters */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium">
              Available Chapters
            </CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Select a chapter from the sidebar to start learning
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentChapters.map((chapter) => (
                <div
                  key={chapter.code}
                  className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant hover:bg-surface-container-highest transition-colors"
                >
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
                  <Badge 
                    variant="secondary" 
                    className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-xl"
                  >
                    {chapter.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
