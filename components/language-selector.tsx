"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"

interface User {
  uid: string
  language?: string
  region?: string
}

interface LanguageSelectorProps {
  user: User
  onLanguageChange: (language: string) => void
}

export function LanguageSelector({ user, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
    { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", flag: "🇮🇳" },
  ]

  const [selectedLang, setSelectedLang] = useState(user?.language || "en")

  useEffect(() => {
    setSelectedLang(user?.language || "en")
  }, [user])

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode)
    onLanguageChange(langCode)

    // In a real app, this would update the user's profile in the database
    console.log(`Language changed to: ${langCode}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>Language Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose your preferred language for AI conversations and interface text.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              variant={selectedLang === lang.code ? "default" : "outline"}
              className="h-auto p-4 justify-start space-x-3"
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <div className="font-medium">{lang.label}</div>
                <div className="text-sm opacity-70">{lang.nativeLabel}</div>
              </div>
              {selectedLang === lang.code && <Check className="w-4 h-4 ml-auto" />}
            </Button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Language changes will apply to new conversations and interface elements.
        </div>
      </CardContent>
    </Card>
  )
}
