"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Play, Clock, Zap, Target, Trophy, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function WorkoutPage() {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])

  const workoutCategories = [
    {
      id: "stress-relief",
      title: "Stress Relief Workouts",
      description: "Gentle exercises to release tension and clear your mind",
      color: "bg-gradient-to-r from-blue-400 to-cyan-400",
      workouts: [
        { name: "Gentle Yoga Flow", duration: "15 min", intensity: "Low", focus: "Flexibility & Calm" },
        { name: "Walking Meditation", duration: "20 min", intensity: "Low", focus: "Mindful Movement" },
        { name: "Tai Chi Basics", duration: "12 min", intensity: "Low", focus: "Balance & Peace" },
      ],
    },
    {
      id: "energy-boost",
      title: "Energy Boosting",
      description: "Quick workouts to energize your body and refresh your mind",
      color: "bg-gradient-to-r from-orange-400 to-red-400",
      workouts: [
        { name: "Morning Energizer", duration: "10 min", intensity: "Medium", focus: "Full Body Wake-up" },
        { name: "Cardio Burst", duration: "8 min", intensity: "High", focus: "Heart Rate & Energy" },
        { name: "Dynamic Stretching", duration: "12 min", intensity: "Medium", focus: "Mobility & Activation" },
      ],
    },
    {
      id: "mood-lift",
      title: "Mood Lifting",
      description: "Fun exercises designed to boost endorphins and improve mood",
      color: "bg-gradient-to-r from-purple-400 to-pink-400",
      workouts: [
        { name: "Dance Therapy", duration: "15 min", intensity: "Medium", focus: "Joy & Expression" },
        { name: "Boxing for Mood", duration: "12 min", intensity: "High", focus: "Release & Empowerment" },
        { name: "Strength & Confidence", duration: "18 min", intensity: "Medium", focus: "Building Power" },
      ],
    },
    {
      id: "focus-clarity",
      title: "Focus & Clarity",
      description: "Mindful movement to enhance concentration and mental clarity",
      color: "bg-gradient-to-r from-green-400 to-emerald-400",
      workouts: [
        { name: "Pilates Core", duration: "20 min", intensity: "Medium", focus: "Core & Concentration" },
        { name: "Balance Challenge", duration: "10 min", intensity: "Low", focus: "Stability & Focus" },
        { name: "Mindful Strength", duration: "25 min", intensity: "Medium", focus: "Mind-Muscle Connection" },
      ],
    },
  ]

  const todayStats = {
    workoutsCompleted: 2,
    totalTime: 35,
    caloriesBurned: 180,
    moodImprovement: 85,
  }

  const weeklyGoal = {
    target: 150, // minutes
    completed: 120,
  }

  const startWorkout = (categoryId: string, workoutName: string) => {
    setActiveWorkout(`${categoryId}-${workoutName}`)
  }

  const completeWorkout = (workoutId: string) => {
    setCompletedWorkouts([...completedWorkouts, workoutId])
    setActiveWorkout(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Mind-Body Workouts
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Physical movement designed to refresh your mind, boost your mood, and bring mental clarity through exercise.
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6 text-center">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">{todayStats.workoutsCompleted}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Workouts Today</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6 text-center">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{todayStats.totalTime}m</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Active Time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6 text-center">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-orange-600">{todayStats.caloriesBurned}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Calories Burned</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6 text-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-green-600">{todayStats.moodImprovement}%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Mood Boost</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goal */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weekly Movement Goal
            </CardTitle>
            <CardDescription>Stay active for better mental health - you're doing great!</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress this week</span>
                <span className="text-sm text-muted-foreground">
                  {weeklyGoal.completed} / {weeklyGoal.target} minutes
                </span>
              </div>
              <Progress value={(weeklyGoal.completed / weeklyGoal.target) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Just {weeklyGoal.target - weeklyGoal.completed} more minutes to reach your goal!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Workout Categories */}
        <div className="space-y-6 sm:space-y-8">
          {workoutCategories.map((category) => (
            <Card key={category.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${category.color} flex items-center justify-center`}
                  >
                    <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">{category.title}</CardTitle>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                  {category.workouts.map((workout, index) => (
                    <Card
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-md transition-all cursor-pointer group touch-manipulation active:scale-95"
                      onClick={() => startWorkout(category.id, workout.name)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              workout.intensity === "High"
                                ? "border-red-300 text-red-600"
                                : workout.intensity === "Medium"
                                  ? "border-yellow-300 text-yellow-600"
                                  : "border-green-300 text-green-600"
                            }`}
                          >
                            {workout.intensity}
                          </Badge>
                          <span className="text-sm font-medium text-muted-foreground">{workout.duration}</span>
                        </div>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                          {workout.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">{workout.focus}</p>
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 touch-manipulation"
                        >
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Start Workout
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 shadow-lg">
          <CardContent className="p-4 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Need an Instant Mood Boost?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Try our 5-minute energy burst workout - perfect for when you need to clear your head and refresh your mind
              quickly.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-emerald-50 touch-manipulation"
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Quick 5-Min Boost
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
