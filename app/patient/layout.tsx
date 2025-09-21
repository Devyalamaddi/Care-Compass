"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  FileText,
  MessageSquare,
  Calendar,
  LogOut,
  Plus,
  Activity,
  Menu,
  X,
  Target,
  Heart,
  Users,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PatientLayoutProps {
  children: ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
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
    { name: "Dashboard", href: "/patient/dashboard", icon: Home },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Peer Circles", href: "/circles", icon: Users },
    { name: "Crisis Support", href: "/crisis", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Wellness Check", href: "/patient/wellness", icon: Plus },
    { name: "Appointments", href: "/patient/appointments", icon: Calendar },
    { name: "Records", href: "/patient/records", icon: FileText },
    { name: "Goals", href: "/patient/goals", icon: Target },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  const handleNavigationClick = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header with Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
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
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">Care Compass</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Notifications
            </Button>
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
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isMobile ? (isMobileSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full w-64") : "w-64"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
          {/* User Info */}
          <div className="py-4 bg-blue-25 dark:bg-blue-900/10 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 px-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">D</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Devendra</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Patient</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 space-y-2 transition-all duration-300 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={handleNavigationClick}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full transition-all duration-300 ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    } justify-start`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User Actions (Sticky Logout) */}
          <div className="border-t border-gray-200 dark:border-gray-700 transition-all duration-300 p-4 sticky bottom-0 bg-white dark:bg-gray-800 z-10">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50 w-full bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isMobile ? "ml-0" : "ml-64"}`}
        style={{ marginTop: "64px" }}
      >
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
