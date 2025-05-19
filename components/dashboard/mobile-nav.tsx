"use client"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

// Simplified mobile nav to avoid build issues
export function MobileNav() {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
}
