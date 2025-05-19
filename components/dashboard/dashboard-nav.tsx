"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface NavItem {
  title: string
  href: string
  icon: keyof typeof Icons
  disabled?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "home",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: "fileText",
  },
  {
    title: "New Report",
    href: "/dashboard/new-report",
    icon: "search",
  },
  {
    title: "Storm Tracker",
    href: "/dashboard/storm-tracker",
    icon: "storm",
  },
  {
    title: "Skip Trace",
    href: "/dashboard/skip-trace",
    icon: "users",
  },
  {
    title: "Proposals",
    href: "/dashboard/proposals",
    icon: "fileText",
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: "calendar",
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: "users",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: "chart",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block space-y-1 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">Navigation</h2>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = Icons[item.icon]
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
                asChild
                disabled={item.disabled}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
