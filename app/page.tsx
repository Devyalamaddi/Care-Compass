"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Care Compass</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="max-w-full mx-auto">
          {/* Hero Section with Spline */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 px-4 lg:px-0">
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                  Care Compass
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full animate-bounce"></div>
                </h1>
                <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-xl"></div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 animate-pulse">
                Your Mental Health Companion
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Navigate your mental health journey with culturally-aware AI support, anonymous peer connections, and
                crisis intervention tools designed for your unique needs.
              </p>

              {/* Stats or trust indicators */}
              <div className="flex flex-wrap gap-3 sm:gap-6 justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    24/7 Available
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-sm">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secure & Private
                  </span>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 touch-manipulation" asChild>
                  <Link href="/auth/login">Access Care Compass</Link>
                </Button>
              </div>
            </div>

            {/* Spline iframe */}
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
              <iframe
                src="https://my.spline.design/nexbotrobotcharacterconcept-22637c44a77736a58365c65e225a8d97/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="w-full h-full rounded-2xl transform group-hover:scale-101 transition-transform duration-500"
                title="Care Compass AI Assistant"
              />
              <span className="absolute right-2 sm:right-4 bottom-3 sm:bottom-5 z-50 bg-white dark:bg-gray-800 text-xs font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded shadow-md">
                Care Compass
              </span>
              <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4 lg:px-0">
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-2 touch-manipulation">
              <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="relative mx-auto mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Cultural Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6 pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  AI that understands cultural context and family dynamics specific to your background.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-2 touch-manipulation">
              <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="relative mx-auto mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Crisis Guardian
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6 pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Predictive monitoring with 60-second human connection when you need it most.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-2 touch-manipulation">
              <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="relative mx-auto mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Anonymous Peer Circles
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 sm:p-6 pt-0">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect with others facing similar challenges in completely anonymous group spaces.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
