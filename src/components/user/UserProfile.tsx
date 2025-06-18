
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { User, Mail, Calendar, Award, Settings } from "lucide-react";

export function UserProfile() {
  const { user } = useUser();

  const userStats = [
    { label: "Chapters Completed", value: "3", icon: Award },
    { label: "Study Hours", value: "24", icon: Calendar },
    { label: "Progress", value: "60%", icon: User },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full overflow-auto p-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-on-surface headline-large">
            User Profile
          </h1>
          <p className="text-lg text-on-surface-variant body-large">
            Manage your account and track your learning progress
          </p>
        </div>

        {/* Profile Information */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary-container text-primary text-2xl">
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-on-surface headline-medium">
                  {user?.fullName || "User"}
                </CardTitle>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Mail className="h-4 w-4" />
                  <span className="body-medium">
                    {user?.emailAddresses[0]?.emailAddress || "user@aerolearn.com"}
                  </span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-xl"
                >
                  Premium Member
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant"
                >
                  <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                    <stat.icon className="h-6 w-6 text-primary" />
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <Settings className="h-6 w-6" />
              Account Settings
            </CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Manage your account preferences and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant">
                <div>
                  <h3 className="font-semibold text-on-surface body-large">Email Notifications</h3>
                  <p className="text-sm text-on-surface-variant body-small">
                    Receive updates about your learning progress
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-primary-container text-primary border-primary hover:bg-primary hover:text-on-primary rounded-2xl"
                >
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant">
                <div>
                  <h3 className="font-semibold text-on-surface body-large">Privacy Settings</h3>
                  <p className="text-sm text-on-surface-variant body-small">
                    Control your data and privacy preferences
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-primary-container text-primary border-primary hover:bg-primary hover:text-on-primary rounded-2xl"
                >
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
