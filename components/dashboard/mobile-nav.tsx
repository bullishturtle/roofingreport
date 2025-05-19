"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Open mobile navigation"
        >
          <Icons.menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black/90 backdrop-blur-md border-white/10 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
                <span className="text-xl font-bold text-black">R</span>
              </div>
              <span className="text-xl font-bold">
                Roof<span className="text-neon-gold">Fax</span>
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-1">
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
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
