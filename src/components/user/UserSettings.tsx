
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Download,
  Trash2,
  Key
} from "lucide-react";
import { useState } from "react";

export function UserSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const settingsSections = [
    {
      title: "Preferences",
      icon: Settings,
      items: [
        {
          label: "Dark Mode",
          description: "Switch to dark theme",
          value: darkMode,
          onChange: setDarkMode,
          icon: Moon
        },
        {
          label: "Auto-save Progress",
          description: "Automatically save your learning progress",
          value: autoSave,
          onChange: setAutoSave,
          icon: Download
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Email Notifications",
          description: "Receive email updates about your progress",
          value: notifications,
          onChange: setNotifications,
          icon: Bell
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: []
    }
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
            Settings
          </h1>
          <p className="text-lg text-on-surface-variant body-large">
            Customize your learning experience and account preferences
          </p>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <Card key={section.title} className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
                <section.icon className="h-6 w-6" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {section.items.length > 0 ? (
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Label htmlFor={`setting-${index}-${itemIndex}`} className="text-base font-semibold text-on-surface body-large">
                              {item.label}
                            </Label>
                            <p className="text-sm text-on-surface-variant body-small">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          id={`setting-${index}-${itemIndex}`}
                          checked={item.value}
                          onCheckedChange={item.onChange}
                        />
                      </div>
                      {itemIndex < section.items.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {section.title === "Privacy & Security" && (
                    <>
                      <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                            <Key className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-on-surface body-large">Change Password</h3>
                            <p className="text-sm text-on-surface-variant body-small">
                              Update your account password
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="bg-primary-container text-primary border-primary hover:bg-primary hover:text-on-primary rounded-2xl"
                        >
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-error-container rounded-2xl flex items-center justify-center shadow-elevation-1">
                            <Trash2 className="h-5 w-5 text-error" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-on-surface body-large">Delete Account</h3>
                            <p className="text-sm text-on-surface-variant body-small">
                              Permanently delete your account and all data
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="destructive" 
                          className="rounded-2xl"
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Language & Region */}
        <Card className="bg-surface-container border-outline shadow-elevation-1 rounded-3xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-on-surface headline-medium flex items-center gap-3">
              <Globe className="h-6 w-6" />
              Language & Region
            </CardTitle>
            <CardDescription className="text-on-surface-variant body-medium">
              Set your preferred language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant">
              <div>
                <h3 className="font-semibold text-on-surface body-large">Language</h3>
                <p className="text-sm text-on-surface-variant body-small">
                  Currently set to English (US)
                </p>
              </div>
              <Button 
                variant="outline" 
                className="bg-primary-container text-primary border-primary hover:bg-primary hover:text-on-primary rounded-2xl"
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
