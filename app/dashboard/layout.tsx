import type React from "react"
import { CareCompassLayout } from "@/components/care-compass-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CareCompassLayout>{children}</CareCompassLayout>
}
