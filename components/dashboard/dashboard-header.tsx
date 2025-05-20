"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { signOut } from "next-auth/react"
import { useToast } from "@/components/ui/toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileNav } from "@/components/dashboard/mobile-nav"

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { showToast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      showToast("Signed out successfully", "success")
      window.location.href = "/login"
    } catch (error) {
      showToast("Error signing out", "error")
    }
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <span className="text-xl font-bold text-white hidden md:inline-block">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Notifications"
          >
            <Icons.bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback className="bg-neon-gold/20 text-neon-gold">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md border-white/10">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                  <p className="text-xs leading-none text-white/70">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="cursor-pointer text-white/90 focus:text-white focus:bg-white/10"
                >
                  <Icons.user className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="cursor-pointer text-white/90 focus:text-white focus:bg-white/10"
                >
                  <Icons.settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="cursor-pointer text-white/90 focus:text-white focus:bg-white/10"
                onClick={handleSignOut}
              >
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
