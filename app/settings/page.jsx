"use client";

import React from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "../../src/hooks/useTheme";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Switch } from "../../src/components/ui/switch";
import { Label } from "../../src/components/ui/label";
import { Separator } from "../../src/components/ui/separator";
import {
  Palette,
  Moon,
  Sun,
  Monitor,
  User,
  Bell,
  Shield,
  Save,
  RefreshCw,
} from "lucide-react";
import ThemeSelector from "../../src/components/ui/theme-selector";

const Settings = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();

  const [notifications, setNotifications] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);
  const [autoSave, setAutoSave] = React.useState(true);

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved");
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setEmailUpdates(false);
    setAutoSave(true);
  };

  return (
    <>
      <Helmet>
        <title>Settings | AuraHR</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <ThemeSelector className="w-full" />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Current Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      {theme === "light" ? "Light Mode" : "Dark Mode"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {theme === "light" ? (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Profile */}
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.name || session?.user?.fullname || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.roleId === 1 ? "Administrator" : "User"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get email notifications for system updates
                  </p>
                </div>
                <Switch
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Application behavior and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save your work
                  </p>
                </div>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <p className="text-sm text-muted-foreground">
                  UTC (Coordinated Universal Time)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Save Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your settings and preferences
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Settings;
