"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Play, Pause, RotateCcw, Timer, Leaf, Wind, Mountain, Waves } from "lucide-react"
import { useState, useEffect } from "react"

export default function MindfulnessPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(10)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentSession) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSession])

  const meditationSessions = [
    {
      id: "breathing",
      title: "Mindful Breathing",
      description: "Focus on your breath to center your mind",
      duration: "5-20 min",
      icon: Wind,
      color: "bg-gradient-to-r from-blue-400 to-cyan-400",
      category: "Breathing",
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      duration: "10-30 min",
      icon: Leaf,
      color: "bg-gradient-to-r from-green-400 to-emerald-400",
      category: "Relaxation",
    },
    {
      id: "mountain",
      title: "Mountain Meditation",
      description: "Find stability and strength like a mountain",
      duration: "15-25 min",
      icon: Mountain,
      color: "bg-gradient-to-r from-gray-400 to-slate-400",
      category: "Grounding",
    },
    {
      id: "loving-kindness",
      title: "Loving Kindness",
      description: "Cultivate compassion for yourself and others",
      duration: "10-20 min",
      icon: Waves,
      color: "bg-gradient-to-r from-pink-400 to-rose-400",
      category: "Compassion",
    },
  ]

  const quickExercises = [
    { name: "4-7-8 Breathing", duration: "2 min", description: "Inhale 4, hold 7, exhale 8" },
    { name: "5-4-3-2-1 Grounding", duration: "3 min", description: "Engage all five senses" },
    { name: "Progressive Muscle", duration: "5 min", description: "Tense and release muscles" },
    { name: "Mindful Observation", duration: "3 min", description: "Focus on one object deeply" },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startSession = (sessionId: string) => {
    setCurrentSession(sessionId)
    setSessionTime(0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSession = () => {
    setIsPlaying(false)
    setSessionTime(0)
    setCurrentSession(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mindfulness Center
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Cultivate inner peace and mental clarity through guided meditation and mindfulness practices.
          </p>
        </div>

        {/* Active Session */}
        {currentSession && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {meditationSessions.find((s) => s.id === currentSession)?.title}
                  </h2>
                  <p className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600">{formatTime(sessionTime)}</p>
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 touch-manipulation"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
                  </Button>
                  <Button
                    onClick={resetSession}
                    variant="outline"
                    size="lg"
                    className="touch-manipulation bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meditation Sessions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Guided Meditations
            </CardTitle>
            <CardDescription>Choose from our collection of guided meditation sessions</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {meditationSessions.map((session) => (
                <div
                  key={session.id}
                  className="group relative overflow-hidden rounded-xl p-4 sm:p-6 text-white cursor-pointer transform transition-all hover:scale-105 active:scale-95 touch-manipulation"
                  onClick={() => startSession(session.id)}
                >
                  <div className={`absolute inset-0 ${session.color}`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                        {session.category}
                      </Badge>
                      <session.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{session.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{session.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{session.duration}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white border-0 touch-manipulation"
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Exercises */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Quick Mindfulness Exercises
            </CardTitle>
            <CardDescription>Short practices for immediate stress relief and mental clarity</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickExercises.map((exercise, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-md transition-all cursor-pointer touch-manipulation active:scale-95"
                >
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">{exercise.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {exercise.duration}
                      </Badge>
                      <Button size="sm" variant="ghost" className="touch-manipulation">
                        Try Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Today's Practice</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">12 min</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total meditation time</p>
                <Progress value={60} className="mt-4" />
                <p className="text-xs text-muted-foreground mt-2">Goal: 20 min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Streak</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">7 days</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Current streak</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">24</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total sessions</p>
                <Badge variant="secondary" className="mt-4 text-xs">
                  Mindful Explorer
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
