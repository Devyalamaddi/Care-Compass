"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
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
            Welcome back to your mental wellness journey
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-11 touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs sm:text-sm text-blue-600 hover:underline touch-manipulation"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-10 sm:h-11 touch-manipulation" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium touch-manipulation">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Secure</p>
              </div>
              <div className="text-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Caring</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300">Community</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 px-4">
            By signing in, you agree to our{" "}
            <Link href="/privacy" className="underline touch-manipulation">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline touch-manipulation">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
