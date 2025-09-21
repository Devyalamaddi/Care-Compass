"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw, Share } from "lucide-react"

interface User {
  uid: string
  region?: string
  language?: string
  moodTags?: string[]
}

interface AffirmationsWidgetProps {
  user: User
}

export function AffirmationsWidget({ user }: AffirmationsWidgetProps) {
  const [affirmation, setAffirmation] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample affirmations based on cultural context and mood
  const affirmations = [
    "You are navigating challenges with courage and wisdom. Every step forward is progress worth celebrating.",
    "Your strength comes from within, and you have overcome difficulties before. Trust in your resilience.",
    "It's okay to take things one day at a time. Your mental health journey is unique and valuable.",
    "You deserve compassion, especially from yourself. Be gentle with your healing process.",
    "Your feelings are valid, and seeking support shows tremendous courage and self-awareness.",
    "You are more than your struggles. Your worth is not defined by your difficult moments.",
    "Every small step toward wellness matters. You are building a foundation of strength and hope.",
  ]

  useEffect(() => {
    let cancelled = false
    async function fetchAffirmation() {
      setLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (!cancelled) {
          // In a real app, this would call an API endpoint
          // For now, we'll select a random affirmation
          const randomIndex = Math.floor(Math.random() * affirmations.length)
          setAffirmation(affirmations[randomIndex])
        }
      } catch (e) {
        console.error(e)
        if (!cancelled) {
          setAffirmation("You are doing your best — that is enough for today.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAffirmation()
    return () => {
      cancelled = true
    }
  }, [user])

  const refreshAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length)
    setAffirmation(affirmations[randomIndex])
  }

  const shareAffirmation = () => {
    if (navigator.share && affirmation) {
      navigator.share({
        text: affirmation,
        title: "Daily Affirmation from Care Compass",
      })
    }
  }

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-primary">
          <Heart className="w-5 h-5" />
          <span>Daily Affirmation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[80px] flex items-center">
          {loading ? (
            <p className="text-muted-foreground animate-pulse">Loading your personalized affirmation...</p>
          ) : (
            <p className="text-foreground text-lg leading-relaxed font-medium text-balance" aria-live="polite">
              {affirmation}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAffirmation}
            className="flex items-center space-x-1 bg-transparent"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Affirmation</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareAffirmation}
            className="flex items-center space-x-1 bg-transparent"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
