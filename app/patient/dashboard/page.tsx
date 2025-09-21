"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, Users, MessageSquare, Activity, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Devendra</h1>
        <p className="text-muted-foreground">Here's your mental wellness overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2/10</div>
            <p className="text-xs text-muted-foreground">+0.5 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crisis Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Safe</div>
            <p className="text-xs text-muted-foreground">All systems normal</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <CardTitle>AI Chat</CardTitle>
            </div>
            <CardDescription>Talk to your AI counselor</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/chat">Start Conversation</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-purple-600" />
              <CardTitle>Peer Circles</CardTitle>
            </div>
            <CardDescription>Join anonymous support groups</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/circles">Browse Circles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-green-600" />
              <CardTitle>Wellness Check</CardTitle>
            </div>
            <CardDescription>Track your daily mood</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/wellness">Check In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Affirmation */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span>Today's Affirmation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg font-medium text-center italic">
            "You are navigating challenges with courage and wisdom. Every step forward is progress worth celebrating."
          </blockquote>
          <div className="flex justify-center mt-4">
            <Button variant="ghost" size="sm">
              Share
            </Button>
            <Button variant="ghost" size="sm">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your wellness journey highlights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Completed mood check-in</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <Badge variant="secondary">+5 points</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Joined "Academic Stress" circle</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
            <Badge variant="secondary">New</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">AI chat session completed</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
            <Badge variant="secondary">30 min</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
