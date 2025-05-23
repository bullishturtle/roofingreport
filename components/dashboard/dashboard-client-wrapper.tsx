"use client"

import type React from "react"

import { useState } from "react"
import { DashboardNav } from "./dashboard-nav"
import { DashboardHeader } from "./dashboard-header"
import { MobileNav } from "./mobile-nav"

interface DashboardClientWrapperProps {
  children: React.ReactNode
}

export function DashboardClientWrapper({ children }: DashboardClientWrapperProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardNav className="hidden md:flex" />

      <div className="flex-1">
        <DashboardHeader onMobileMenuClick={() => setIsMobileNavOpen(true)} />

        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </div>
  )
}
