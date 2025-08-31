"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Key,
  Camera,
  Save,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { isOpen } = useSidebarStore();
  const [activeTab, setActiveTab] = useState("profile");

  const [userProfile, setUserProfile] = useState({
    name: "John Smith",
    email: "john.smith@mission.org",
    phone: "+1 (555) 123-4567",
    location: "São Paulo, Brazil",
    role: "Senior Missionary",
    bio: "Dedicated missionary with 5+ years of experience in South American missions. Passionate about community outreach and cultural exchange.",
    joinDate: "2019-03-15",
    avatar: "/avatars/01.png",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    messageNotifications: true,
    weeklyReports: true,
    missionUpdates: true,
  });

  const [preferences, setPreferences] = useState({
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    theme: "light",
    dateFormat: "DD/MM/YYYY",
    currency: "BRL",
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    locationSharing: true,
    activityStatus: true,
    contactInfo: "missionaries",
  });

  const settingsTabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "preferences", name: "Preferences", icon: Palette },
    { id: "privacy", name: "Privacy", icon: Shield },
    { id: "security", name: "Security", icon: Key },
  ];

  const handleSaveProfile = () => {
    console.log("Saving profile:", userProfile);
    // Here you would typically save to your backend
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main
        className={`flex-1 overflow-auto bg-background transition-all duration-300 ${
          isOpen ? "ml-0" : "ml-0"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b bg-card">
          <SidebarToggle />
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Settings Navigation */}
          <div className="w-64 border-r bg-card">
            <div className="p-4">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                  <p className="text-muted-foreground">
                    Manage your personal information and profile details.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback>
                          {userProfile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={userProfile.role}
                          onValueChange={(value) =>
                            setUserProfile((prev) => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Senior Missionary">
                              Senior Missionary
                            </SelectItem>
                            <SelectItem value="Missionary">
                              Missionary
                            </SelectItem>
                            <SelectItem value="Field Coordinator">
                              Field Coordinator
                            </SelectItem>
                            <SelectItem value="Cultural Coordinator">
                              Cultural Coordinator
                            </SelectItem>
                            <SelectItem value="Training Coordinator">
                              Training Coordinator
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userProfile.location}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={userProfile.bio}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Notification Settings
                  </h2>
                  <p className="text-muted-foreground">
                    Choose how you want to be notified about updates and
                    activities.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(
                            "emailNotifications",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications in your browser
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("pushNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates via SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("smsNotifications", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>Event Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminded about upcoming events
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("eventReminders", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>Message Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new messages
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.messageNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(
                            "messageNotifications",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly activity summaries
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("weeklyReports", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Preferences</h2>
                  <p className="text-muted-foreground">
                    Customize your experience with language, timezone, and
                    display settings.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) =>
                            handlePreferenceChange("language", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">
                              Português (Brasil)
                            </SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="es-ES">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select
                          value={preferences.timezone}
                          onValueChange={(value) =>
                            handlePreferenceChange("timezone", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Sao_Paulo">
                              São Paulo (GMT-3)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              New York (GMT-5)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London (GMT+0)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Date Format</Label>
                        <Select
                          value={preferences.dateFormat}
                          onValueChange={(value) =>
                            handlePreferenceChange("dateFormat", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="MM/DD/YYYY">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select
                          value={preferences.currency}
                          onValueChange={(value) =>
                            handlePreferenceChange("currency", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BRL">
                              Brazilian Real (R$)
                            </SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) =>
                          handlePreferenceChange("theme", value)
                        }
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Privacy Settings</h2>
                  <p className="text-muted-foreground">
                    Control who can see your information and how it's shared.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Who can see your profile</Label>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(value) =>
                          handlePrivacyChange("profileVisibility", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="missionaries">
                            Missionaries Only
                          </SelectItem>
                          <SelectItem value="team">
                            Team Members Only
                          </SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Share Location</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your current location
                        </p>
                      </div>
                      <Switch
                        checked={privacy.locationSharing}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("locationSharing", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Activity Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online or active
                        </p>
                      </div>
                      <Switch
                        checked={privacy.activityStatus}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("activityStatus", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
                  <p className="text-muted-foreground">
                    Manage your account security and authentication settings.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Active Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • São Paulo, Brazil
                            </p>
                          </div>
                          <span className="text-sm text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
