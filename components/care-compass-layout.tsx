"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  Shield,
  Brain,
  Phone,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EmergencyButton } from "./emergency-button"

interface CareCompassLayoutProps {
  children: ReactNode
}

export function CareCompassLayout({ children }: CareCompassLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Peer Circles", href: "/circles", icon: Users },
    { name: "Crisis Support", href: "/crisis", icon: Shield },
    { name: "Wellness", href: "/wellness", icon: Heart },
    { name: "Mindfulness", href: "/mindfulness", icon: Brain },
    { name: "Workout", href: "/workout", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const handleLogout = () => {
    router.push("/auth/login")
  }

  const handleNavigationClick = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="md:hidden"
              >
                {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Care Compass
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white/90 backdrop-blur-md shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isMobile ? (isMobileSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full w-64") : "w-64"
        }`}
        style={{ top: "73px" }}
      >
        <div className="flex flex-col h-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 73px)" }}>
          {/* User Info */}
          <div className="py-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-blue-600">Mental Health Journey</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 space-y-2 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={handleNavigationClick}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "hover:bg-blue-50 text-gray-700"
                    } justify-start`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Emergency Contact */}
          <div className="border-t border-gray-200 p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-800">24/7 Crisis Support</span>
              </div>
              <p className="text-xs text-red-700 mb-2">National Suicide Prevention Lifeline</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                onClick={() => window.open("tel:988")}
              >
                Call 988
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isMobile ? "ml-0" : "ml-64"}`}
        style={{ marginTop: "73px" }}
      >
        <main className="p-6">{children}</main>
      </div>

      {/* Emergency Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <EmergencyButton />
      </div>
    </div>
  )
}
