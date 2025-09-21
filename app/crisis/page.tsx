"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Phone, MessageCircle, ArrowLeft, Mic, MicOff, Activity, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

interface CrisisEvent {
  id: string
  timestamp: Date
  riskLevel: "low" | "medium" | "high" | "critical"
  triggers: string[]
  emotionScore: number
  transcript?: string
  escalated: boolean
}

export default function CrisisPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [currentRiskLevel, setCurrentRiskLevel] = useState<"safe" | "low" | "medium" | "high" | "critical">("safe")
  const [emotionScore, setEmotionScore] = useState(0)
  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [recentEvents, setRecentEvents] = useState<CrisisEvent[]>([])
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const countdownRef = useRef<NodeJS.Timeout>()

  // Mock crisis detection simulation
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate emotion analysis
        const mockScore = Math.random() * 100
        setEmotionScore(mockScore)

        // Determine risk level based on score
        let risk: "safe" | "low" | "medium" | "high" | "critical" = "safe"
        if (mockScore > 80) risk = "critical"
        else if (mockScore > 65) risk = "high"
        else if (mockScore > 45) risk = "medium"
        else if (mockScore > 25) risk = "low"

        setCurrentRiskLevel(risk)

        // Trigger crisis modal for high risk
        if (risk === "high" || risk === "critical") {
          setShowCrisisModal(true)
          setCountdown(60)
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  // Countdown timer for crisis modal
  useEffect(() => {
    if (showCrisisModal && countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      // Auto-escalate to human counselor
      handleEscalate()
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current)
      }
    }
  }, [showCrisisModal, countdown])

  const startMonitoring = () => {
    setIsMonitoring(true)
    setIsListening(true)
    // In a real app, this would start voice recording and analysis
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    setIsListening(false)
    setCurrentRiskLevel("safe")
    setEmotionScore(0)
  }

  const handleEscalate = () => {
    const newEvent: CrisisEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      riskLevel: currentRiskLevel as "low" | "medium" | "high" | "critical",
      triggers: ["emotional distress", "voice analysis"],
      emotionScore,
      transcript: transcript || "Voice analysis detected high emotional distress",
      escalated: true,
    }

    setRecentEvents((prev) => [newEvent, ...prev.slice(0, 4)])
    setShowCrisisModal(false)
    setCountdown(60)

    // In a real app, this would connect to a human counselor
    alert("Connecting you to a human counselor within 60 seconds...")
  }

  const dismissCrisis = () => {
    setShowCrisisModal(false)
    setCountdown(60)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "safe":
        return "text-green-600 bg-green-50 border-green-200"
      case "low":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "critical":
        return "text-red-800 bg-red-100 border-red-300"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getProgressColor = (score: number) => {
    if (score > 80) return "bg-red-500"
    if (score > 65) return "bg-red-400"
    if (score > 45) return "bg-orange-400"
    if (score > 25) return "bg-yellow-400"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-red-300 bg-red-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-red-800">Crisis Support Activated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-red-700">
                We've detected signs of emotional distress. A human counselor will connect with you in:
              </p>
              <div className="text-4xl font-bold text-red-800">{countdown}s</div>
              <div className="space-y-2">
                <Button onClick={handleEscalate} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Connect Now
                </Button>
                <Button
                  onClick={dismissCrisis}
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  I'm Okay - Dismiss
                </Button>
              </div>
              <p className="text-xs text-red-600">Emergency: Call 102 (India) or your local emergency number</p>
            </CardContent>
          </Card>
        </div>
      )}

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
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">Crisis Guardian</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isMonitoring ? "bg-green-500" : "bg-gray-400"}`}></div>
                  <span className="text-xs text-muted-foreground">
                    {isMonitoring ? "Monitoring Active" : "Monitoring Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Badge className={getRiskColor(currentRiskLevel)}>{currentRiskLevel.toUpperCase()}</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Crisis Monitoring & Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Our AI monitors your emotional state and connects you with human support within 60 seconds when needed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Monitoring Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Real-time Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto relative">
                    <div className="w-full h-full rounded-full border-8 border-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{Math.round(emotionScore)}</div>
                        <div className="text-xs text-muted-foreground">Stress Level</div>
                      </div>
                    </div>
                  </div>
                  <Badge className={getRiskColor(currentRiskLevel)} variant="outline">
                    Current Status: {currentRiskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Emotional Distress Level</span>
                    <span>{Math.round(emotionScore)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(emotionScore)}`}
                      style={{ width: `${emotionScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  {!isMonitoring ? (
                    <Button onClick={startMonitoring} size="lg" className="bg-green-600 hover:bg-green-700">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Monitoring
                    </Button>
                  ) : (
                    <Button onClick={stopMonitoring} size="lg" variant="destructive">
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Monitoring
                    </Button>
                  )}
                </div>

                {isListening && (
                  <Alert>
                    <Mic className="w-4 h-4" />
                    <AlertDescription>
                      Voice monitoring is active. Speak naturally - our AI will detect emotional patterns and provide
                      support when needed.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How Crisis Guardian Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                      <Mic className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Voice Analysis</h4>
                    <p className="text-muted-foreground">AI analyzes speech patterns, tone, and emotional indicators</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Risk Detection</h4>
                    <p className="text-muted-foreground">System identifies potential crisis situations in real-time</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Human Connection</h4>
                    <p className="text-muted-foreground">Connects you with trained counselors within 60 seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Emergency Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Crisis Hotline
                </Button>
                <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Text Crisis Support
                </Button>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>India: 102 (Emergency)</p>
                  <p>KIRAN: 1800-599-0019</p>
                  <p>Vandrevala: 1860-2662-345</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent crisis events detected</p>
                ) : (
                  recentEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getRiskColor(event.riskLevel)} variant="outline">
                          {event.riskLevel.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{event.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm">Score: {Math.round(event.emotionScore)}%</p>
                      {event.escalated && (
                        <div className="flex items-center space-x-1 text-xs text-green-600">
                          <Shield className="w-3 h-3" />
                          <span>Support provided</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Voice data is processed locally when possible</p>
                <p>• Crisis events are logged for your safety</p>
                <p>• All data is encrypted and secure</p>
                <p>• You can disable monitoring anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
