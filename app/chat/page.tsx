"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Mic, MicOff, Settings, ArrowLeft, Brain, Globe, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  culturalContext?: string[]
  language?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI counselor. I understand cultural contexts and can communicate in multiple languages. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      culturalContext: ["general"],
      language: "en",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [culturalTags, setCulturalTags] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
    { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  ]

  const culturalKeywords = [
    "family pressure",
    "arranged marriage",
    "career expectations",
    "festival stress",
    "joint family",
    "cultural identity",
    "generation gap",
    "academic pressure",
    "social expectations",
    "traditional values",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectCulturalContext = (message: string): string[] => {
    const detected: string[] = []
    const lowerMessage = message.toLowerCase()

    culturalKeywords.forEach((keyword) => {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        detected.push(keyword)
      }
    })

    return detected
  }

  const generateAIResponse = async (userMessage: string, cultural: string[]): Promise<string> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI responses based on cultural context
    const responses = {
      "family pressure":
        "I understand that family expectations can feel overwhelming. In many cultures, family approval is deeply important, but your mental health matters too. It's okay to set boundaries while still respecting your family relationships.",
      "academic pressure":
        "Academic stress is very common, especially when there are high expectations from family and society. Remember that your worth isn't defined by grades or achievements alone. What specific aspects of academic pressure are affecting you most?",
      "cultural identity":
        "Navigating between different cultural identities can be challenging. It's normal to feel caught between traditions and modern life. Your cultural background is a strength, and finding balance is a personal journey.",
      default:
        "I hear you, and your feelings are completely valid. It takes courage to share what you're going through. Can you tell me more about what's been on your mind lately?",
    }

    // Select response based on detected cultural context
    if (cultural.length > 0) {
      const contextKey = cultural[0].toLowerCase().replace(" ", "_")
      return responses[contextKey as keyof typeof responses] || responses.default
    }

    return responses.default
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: selectedLanguage,
    }

    const detectedCultural = detectCulturalContext(inputMessage)
    setCulturalTags((prev) => [...new Set([...prev, ...detectedCultural])])

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage, detectedCultural)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        culturalContext: detectedCultural,
        language: selectedLanguage,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with Web Speech API
    if (!isListening) {
      // Start voice recognition
      console.log("Starting voice input...")
    } else {
      // Stop voice recognition
      console.log("Stopping voice input...")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">AI Counselor</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-sm bg-background border border-border rounded-md px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Cultural Context Tags */}
      {culturalTags.length > 0 && (
        <div className="border-b border-border/40 px-4 py-2">
          <div className="container mx-auto flex items-center space-x-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Cultural context detected:</span>
            <div className="flex flex-wrap gap-1">
              {culturalTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-4"
                        : "bg-muted text-foreground mr-4"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.culturalContext && message.culturalContext.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Shield className="w-3 h-3 opacity-70" />
                        <span className="text-xs opacity-70">Cultural context applied</span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-xs text-muted-foreground mt-1 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-primary/10 order-1" : "bg-muted order-2"
                  }`}
                >
                  {message.sender === "user" ? (
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  ) : (
                    <Brain className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="bg-muted text-foreground rounded-2xl px-4 py-3 mr-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... (Press Enter to send)"
                className="pr-12 min-h-[44px] resize-none"
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={toggleVoiceInput}
              >
                {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="lg">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>🔒 End-to-end encrypted</span>
              <span>🌍 Cultural context aware</span>
              <span>🔄 Real-time translation</span>
            </div>
            <span>Crisis support available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
