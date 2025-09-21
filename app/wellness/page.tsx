"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Activity, Moon, Sun, Droplets, Target, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function WellnessPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const wellnessMetrics = [
    { label: "Sleep Quality", value: 85, icon: Moon, color: "bg-purple-500" },
    { label: "Hydration", value: 70, icon: Droplets, color: "bg-blue-500" },
    { label: "Physical Activity", value: 60, icon: Activity, color: "bg-green-500" },
    { label: "Mood Balance", value: 75, icon: Heart, color: "bg-pink-500" },
  ]

  const dailyGoals = [
    { id: "meditation", title: "10 min Meditation", completed: true, streak: 7 },
    { id: "water", title: "8 Glasses of Water", completed: false, streak: 3 },
    { id: "exercise", title: "30 min Exercise", completed: false, streak: 5 },
    { id: "gratitude", title: "Gratitude Journal", completed: true, streak: 12 },
  ]

  const wellnessActivities = [
    {
      title: "Morning Routine",
      description: "Start your day with intention and mindfulness",
      duration: "15 min",
      category: "Mindfulness",
      color: "bg-gradient-to-r from-orange-400 to-pink-400",
    },
    {
      title: "Breathing Exercise",
      description: "Calm your mind with guided breathing",
      duration: "5 min",
      category: "Relaxation",
      color: "bg-gradient-to-r from-blue-400 to-cyan-400",
    },
    {
      title: "Nature Walk",
      description: "Connect with nature for mental clarity",
      duration: "20 min",
      category: "Physical",
      color: "bg-gradient-to-r from-green-400 to-emerald-400",
    },
    {
      title: "Evening Reflection",
      description: "Process your day and prepare for rest",
      duration: "10 min",
      category: "Mindfulness",
      color: "bg-gradient-to-r from-purple-400 to-indigo-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-green-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Wellness Dashboard
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Track your holistic wellness journey and build healthy habits that nurture your mind, body, and spirit.
          </p>
        </div>

        {/* Wellness Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {wellnessMetrics.map((metric) => (
            <Card key={metric.label} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <metric.icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    {metric.value}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{metric.label}</h3>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.value >= 80 ? "Excellent" : metric.value >= 60 ? "Good" : "Needs attention"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Goals */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Daily Wellness Goals
            </CardTitle>
            <CardDescription>Complete your daily wellness activities to maintain a healthy lifestyle</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer touch-manipulation ${
                    goal.completed
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50 hover:border-green-300 active:bg-green-50"
                  }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground">{goal.streak} day streak</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full mx-auto ${
                        goal.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}
                    >
                      {goal.completed && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Recommended Activities
            </CardTitle>
            <CardDescription>Personalized wellness activities based on your current needs</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {wellnessActivities.map((activity, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl p-4 sm:p-6 text-white cursor-pointer transform transition-all hover:scale-105 active:scale-95 touch-manipulation"
                >
                  <div className={`absolute inset-0 ${activity.color}`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                        {activity.category}
                      </Badge>
                      <span className="text-sm font-medium">{activity.duration}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{activity.description}</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white border-0 touch-manipulation"
                    >
                      Start Activity
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
            <CardDescription>Your wellness journey over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Wellness Score</span>
                <span className="text-xl sm:text-2xl font-bold text-green-600">78%</span>
              </div>
              <Progress value={78} className="h-3" />
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-6">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full mx-auto ${
                        index < 5 ? "bg-green-500" : index === 5 ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
