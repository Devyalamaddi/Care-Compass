"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LanguageSelector } from "@/components/language-selector"
import { Heart, ArrowLeft, User, Shield, Bell, Palette, Download, Trash2, Save } from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUser = {
  uid: "user123",
  name: "Alex",
  email: "alex@example.com",
  region: "IN",
  language: "en",
  joinedDate: "2024-01-15",
}

export default function SettingsPage() {
  const [user, setUser] = useState(mockUser)
  const [notifications, setNotifications] = useState({
    crisisAlerts: true,
    dailyReminders: true,
    circleUpdates: false,
    weeklyReports: true,
  })
  const [privacy, setPrivacy] = useState({
    familyReports: false,
    anonymousData: true,
    voiceRecording: true,
    locationTracking: false,
  })
  const [appearance, setAppearance] = useState({
    theme: "system",
    readabilityMode: false,
    fontSize: "medium",
  })

  const handleLanguageChange = (language: string) => {
    setUser((prev) => ({ ...prev, language }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to database
    console.log("Settings saved:", { user, notifications, privacy, appearance })
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Settings</span>
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Member since: {new Date(user.joinedDate).toLocaleDateString()}</span>
                <Badge variant="secondary">Verified Account</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <LanguageSelector user={user} onLanguageChange={handleLanguageChange} />

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="crisis-alerts">Crisis Alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate notifications for crisis situations</p>
                  </div>
                  <Switch
                    id="crisis-alerts"
                    checked={notifications.crisisAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, crisisAlerts: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-reminders">Daily Check-in Reminders</Label>
                    <p className="text-sm text-muted-foreground">Gentle reminders for mood tracking</p>
                  </div>
                  <Switch
                    id="daily-reminders"
                    checked={notifications.dailyReminders}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dailyReminders: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="circle-updates">Peer Circle Updates</Label>
                    <p className="text-sm text-muted-foreground">New messages in your circles</p>
                  </div>
                  <Switch
                    id="circle-updates"
                    checked={notifications.circleUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, circleUpdates: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Progress Reports</Label>
                    <p className="text-sm text-muted-foreground">Summary of your wellness journey</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="family-reports">Family Transparency Reports</Label>
                    <p className="text-sm text-muted-foreground">Share anonymous wellness summaries with family</p>
                  </div>
                  <Switch
                    id="family-reports"
                    checked={privacy.familyReports}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, familyReports: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymous-data">Anonymous Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Help improve our services with anonymous usage data</p>
                  </div>
                  <Switch
                    id="anonymous-data"
                    checked={privacy.anonymousData}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, anonymousData: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="voice-recording">Voice Analysis</Label>
                    <p className="text-sm text-muted-foreground">Allow voice recording for crisis monitoring</p>
                  </div>
                  <Switch
                    id="voice-recording"
                    checked={privacy.voiceRecording}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, voiceRecording: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location-tracking">Location Services</Label>
                    <p className="text-sm text-muted-foreground">Find nearby mental health resources</p>
                  </div>
                  <Switch
                    id="location-tracking"
                    checked={privacy.locationTracking}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, locationTracking: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance & Accessibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Theme Preference</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["light", "dark", "system"].map((theme) => (
                      <Button
                        key={theme}
                        variant={appearance.theme === theme ? "default" : "outline"}
                        onClick={() => setAppearance((prev) => ({ ...prev, theme }))}
                        className="capitalize"
                      >
                        {theme}
                      </Button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="readability-mode">Easy Read Mode</Label>
                    <p className="text-sm text-muted-foreground">Larger text and simplified interface</p>
                  </div>
                  <Switch
                    id="readability-mode"
                    checked={appearance.readabilityMode}
                    onCheckedChange={(checked) => setAppearance((prev) => ({ ...prev, readabilityMode: checked }))}
                  />
                </div>
                <Separator />
                <div>
                  <Label>Font Size</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["small", "medium", "large"].map((size) => (
                      <Button
                        key={size}
                        variant={appearance.fontSize === size ? "default" : "outline"}
                        onClick={() => setAppearance((prev) => ({ ...prev, fontSize: size }))}
                        className="capitalize"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  <span>Export My Data</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Data export includes your conversation history, mood tracking, and settings. Account deletion is
                permanent and cannot be undone.
              </p>
            </CardContent>
          </Card>

          {/* Support Information */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-primary">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is here to help you with any questions about your settings or account.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
