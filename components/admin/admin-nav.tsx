"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/backup", label: "Backups" },
    { href: "/admin/web-vitals", label: "Web Vitals" },
    { href: "/admin/performance", label: "Performance" },
  ]

  return (
    <nav className="flex space-x-4 lg:space-x-6 mb-8 overflow-x-auto pb-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
            pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
