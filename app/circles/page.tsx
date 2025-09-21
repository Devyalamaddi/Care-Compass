"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, ArrowLeft, Shield, UserCheck } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  alias: string
  content: string
  timestamp: Date
  mood?: string
}

interface Circle {
  id: string
  name: string
  topic: string
  memberCount: number
  description: string
  mood: string
  isActive: boolean
}

export default function CirclesPage() {
  const [currentCircle, setCurrentCircle] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [userAlias, setUserAlias] = useState("")
  const [availableCircles, setAvailableCircles] = useState<Circle[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate anonymous alias on component mount
  useEffect(() => {
    const savedAlias = localStorage.getItem("peerAlias")
    if (savedAlias) {
      setUserAlias(savedAlias)
    } else {
      const newAlias = `Peer-${Math.floor(Math.random() * 9000) + 1000}`
      setUserAlias(newAlias)
      localStorage.setItem("peerAlias", newAlias)
    }

    // Mock available circles
    setAvailableCircles([
      {
        id: "anxiety-support",
        name: "Anxiety Support",
        topic: "Managing anxiety and stress",
        memberCount: 12,
        description: "A safe space to share experiences with anxiety and learn coping strategies together.",
        mood: "supportive",
        isActive: true,
      },
      {
        id: "academic-pressure",
        name: "Academic Pressure",
        topic: "Student life and academic stress",
        memberCount: 8,
        description: "Connect with others navigating academic challenges and family expectations.",
        mood: "understanding",
        isActive: true,
      },
      {
        id: "cultural-identity",
        name: "Cultural Identity",
        topic: "Balancing tradition and modernity",
        memberCount: 15,
        description: "Discuss the challenges of navigating between cultural expectations and personal identity.",
        mood: "reflective",
        isActive: true,
      },
      {
        id: "family-relationships",
        name: "Family Relationships",
        topic: "Family dynamics and communication",
        memberCount: 6,
        description: "Share experiences about family relationships and finding healthy boundaries.",
        mood: "caring",
        isActive: true,
      },
      {
        id: "career-confusion",
        name: "Career Confusion",
        topic: "Career choices and life direction",
        memberCount: 10,
        description: "Support each other through career decisions and life transitions.",
        mood: "encouraging",
        isActive: true,
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const joinCircle = (circleId: string) => {
    setCurrentCircle(circleId)
    // Mock loading existing messages
    const mockMessages: Message[] = [
      {
        id: "1",
        alias: "Peer-2847",
        content:
          "Hi everyone, I've been struggling with family expectations about my career choice. Anyone else dealing with similar pressure?",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        mood: "concerned",
      },
      {
        id: "2",
        alias: "Peer-5632",
        content:
          "I totally understand. My parents want me to be a doctor but I'm passionate about art. It's so hard to balance what they want with what makes me happy.",
        timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
        mood: "empathetic",
      },
      {
        id: "3",
        alias: "Peer-1923",
        content:
          "You're not alone in this. I found that having honest conversations with my family, while respecting their concerns, helped a lot. It took time but they started to understand my perspective.",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        mood: "supportive",
      },
    ]
    setMessages(mockMessages)
  }

  const leaveCircle = () => {
    setCurrentCircle(null)
    setMessages([])
  }

  const sendMessage = () => {
    if (!inputMessage.trim() || !currentCircle) return

    const newMessage: Message = {
      id: Date.now().toString(),
      alias: userAlias,
      content: inputMessage,
      timestamp: new Date(),
      mood: "neutral",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate other users responding (for demo purposes)
    setTimeout(
      () => {
        const responses = [
          "Thank you for sharing that. Your perspective really helps.",
          "I can relate to what you're going through. Stay strong.",
          "That's a really thoughtful way to look at it.",
          "Sending you positive thoughts and support.",
          "You're being so brave by opening up about this.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          alias: `Peer-${Math.floor(Math.random() * 9000) + 1000}`,
          content: randomResponse,
          timestamp: new Date(),
          mood: "supportive",
        }

        setMessages((prev) => [...prev, responseMessage])
      },
      2000 + Math.random() * 3000,
    ) // Random delay between 2-5 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case "supportive":
        return "text-green-600"
      case "concerned":
        return "text-yellow-600"
      case "empathetic":
        return "text-blue-600"
      case "encouraging":
        return "text-purple-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getCircleColor = (mood: string) => {
    switch (mood) {
      case "supportive":
        return "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
      case "understanding":
        return "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20"
      case "reflective":
        return "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20"
      case "caring":
        return "border-pink-200 bg-pink-50/50 dark:border-pink-800 dark:bg-pink-950/20"
      case "encouraging":
        return "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20"
      default:
        return "border-border bg-card"
    }
  }

  if (!currentCircle) {
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
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground">Peer Circles</span>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">100% Anonymous</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <UserCheck className="w-3 h-3 mr-1" />
                {userAlias}
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Join a Peer Circle</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Connect with others who understand your experiences. All conversations are completely anonymous and
              supportive.
            </p>
          </div>

          {/* Privacy Notice */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-primary mb-2">Your Privacy is Protected</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your identity remains completely anonymous</li>
                    <li>• Messages are not stored permanently</li>
                    <li>• No personal information is shared or required</li>
                    <li>• You can leave any circle at any time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Circles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCircles.map((circle) => (
              <Card
                key={circle.id}
                className={`hover:shadow-lg transition-all cursor-pointer ${getCircleColor(circle.mood)}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{circle.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">{circle.memberCount} active</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{circle.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {circle.topic}
                    </Badge>
                    <Button size="sm" onClick={() => joinCircle(circle.id)} className="text-xs">
                      Join Circle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Be Supportive</h4>
                  <ul className="space-y-1">
                    <li>• Listen with empathy and understanding</li>
                    <li>• Share your experiences to help others</li>
                    <li>• Offer encouragement and hope</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Stay Safe</h4>
                  <ul className="space-y-1">
                    <li>• Don't share personal identifying information</li>
                    <li>• Report any inappropriate behavior</li>
                    <li>• Seek professional help for crisis situations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentCircleData = availableCircles.find((c) => c.id === currentCircle)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={leaveCircle}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">{currentCircleData?.name}</span>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{currentCircleData?.memberCount} members</span>
                  </div>
                  <span>•</span>
                  <span>Anonymous chat</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              <UserCheck className="w-3 h-3 mr-1" />
              {userAlias}
            </Badge>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {/* Welcome Message */}
            <div className="text-center py-4">
              <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground">
                  Welcome to {currentCircleData?.name}. This is a safe, anonymous space for support and understanding.
                </p>
              </div>
            </div>

            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{message.alias}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {message.mood && (
                    <Badge variant="outline" className={`text-xs ${getMoodColor(message.mood)}`}>
                      {message.mood}
                    </Badge>
                  )}
                </div>
                <div className="ml-8 bg-muted/30 rounded-lg p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts with the circle... (Press Enter to send)"
                className="min-h-[44px]"
              />
            </div>
            <Button onClick={sendMessage} disabled={!inputMessage.trim()} size="lg">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>🔒 Anonymous & secure</span>
              <span>💙 Supportive community</span>
              <span>🌍 Cultural understanding</span>
            </div>
            <span>Be kind and supportive</span>
          </div>
        </div>
      </div>
    </div>
  )
}
