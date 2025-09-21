import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AffirmationsWidget } from "@/components/affirmations-widget"
import Link from "next/link"
import {
  Heart,
  MessageCircle,
  Users,
  Shield,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Activity,
} from "lucide-react"

// Mock user data - in real app this would come from authentication/database
const mockUser = {
  uid: "user123",
  name: "Alex",
  region: "IN",
  language: "en",
  moodTags: ["anxiety", "stress"],
  streakDays: 7,
  totalSessions: 23,
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Care Compass</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground">How are you feeling today? Your wellness journey continues here.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUser.streakDays}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUser.totalSessions}</p>
                  <p className="text-sm text-muted-foreground">Chat Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">Safe</p>
                  <p className="text-sm text-muted-foreground">Crisis Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Circles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Affirmations Widget */}
            <AffirmationsWidget user={mockUser} />

            {/* Mood Check-in */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Daily Mood Check-in</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">How are you feeling right now?</p>
                <div className="grid grid-cols-5 gap-2">
                  {["😢", "😕", "😐", "🙂", "😊"].map((emoji, index) => (
                    <Button key={index} variant="outline" className="h-12 text-2xl hover:bg-primary/10 bg-transparent">
                      {emoji}
                    </Button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">Submit Check-in</Button>
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/chat">
                    <Button className="h-20 flex-col space-y-2 w-full bg-transparent" variant="outline">
                      <MessageCircle className="w-6 h-6" />
                      <span>Start Chat</span>
                    </Button>
                  </Link>
                  <Link href="/circles">
                    <Button className="h-20 flex-col space-y-2 w-full bg-transparent" variant="outline">
                      <Users className="w-6 h-6" />
                      <span>Join Circle</span>
                    </Button>
                  </Link>
                  <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                    <Calendar className="w-6 h-6" />
                    <span>Schedule Session</span>
                  </Button>
                  <Link href="/crisis">
                    <Button className="h-20 flex-col space-y-2 w-full bg-transparent" variant="outline">
                      <Shield className="w-6 h-6" />
                      <span>Crisis Support</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wellness Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wellness Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Weekly Goal</span>
                    <span>5/7 days</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mindfulness</span>
                    <span>12/15 min</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Social Connection</span>
                    <span>3/5 interactions</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Completed mood check-in</span>
                  <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Joined anxiety support circle</span>
                  <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">AI chat session completed</span>
                  <span className="text-xs text-muted-foreground ml-auto">2d ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Crisis Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  If you're experiencing a mental health crisis, help is available 24/7.
                </p>
                <Link href="/crisis">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Immediate Help</Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Emergency: Call 102 (India) or your local emergency number
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
