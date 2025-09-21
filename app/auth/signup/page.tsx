"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Heart, Shield, Users, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    language: "",
    agreeToTerms: false,
    allowFamilyTransparency: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Care Compass</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Start your mental wellness journey today
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Join our supportive community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  required
                  className="h-10 sm:h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                  className="h-10 sm:h-11 touch-manipulation"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm sm:text-base">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="18"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    required
                    className="h-10 sm:h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm sm:text-base">
                    Language
                  </Label>
                  <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                    <SelectTrigger className="h-10 sm:h-11 touch-manipulation">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
                      <SelectItem value="ta">தமிழ்</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    required
                    className="h-10 sm:h-11 pr-10 touch-manipulation"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 touch-manipulation"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    required
                    className="h-10 sm:h-11 pr-10 touch-manipulation"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 touch-manipulation"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyTransparency"
                    checked={formData.allowFamilyTransparency}
                    onCheckedChange={(checked) => updateFormData("allowFamilyTransparency", checked as boolean)}
                    className="touch-manipulation"
                  />
                  <Label htmlFor="familyTransparency" className="text-xs sm:text-sm">
                    Allow family transparency (optional)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                    required
                    className="touch-manipulation"
                  />
                  <Label htmlFor="terms" className="text-xs sm:text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline touch-manipulation">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline touch-manipulation">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 touch-manipulation"
                disabled={isLoading || !formData.agreeToTerms}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline font-medium touch-manipulation">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Secure</p>
              </div>
              <div className="text-center">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Multilingual</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Community</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
