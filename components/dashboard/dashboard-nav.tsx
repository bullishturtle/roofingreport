"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Calendar, Settings, HelpCircle, LogOut } from "lucide-react"

interface DashboardNavProps {
  className?: string
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Help",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ]

  return (
    <div
      className={cn(
        "w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex-shrink-0",
        className,
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">RoofFax</span>
        </Link>
      </div>

      <div className="py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500",
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/logout"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          Sign out
        </Link>
      </div>
    </div>
  )
}
