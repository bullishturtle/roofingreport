"use client"

import { Button } from "@/components/ui/button"
import { Search, Cloud, FileText, Zap } from "lucide-react"
import Link from "next/link"

export function SimpleActionBar() {
  return (
    <div className="flex items-center gap-2 min-w-max mx-auto max-w-7xl overflow-x-auto py-2 px-4">
      <Button
        variant="outline"
        size="sm"
        className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
        asChild
      >
        <Link href="/dashboard/new-report">
          <Search className="h-4 w-4 mr-2" />
          <span>Roof Reports</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
        asChild
      >
        <Link href="/dashboard/weather">
          <Cloud className="h-4 w-4 mr-2" />
          <span>Weather Tracking</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
        asChild
      >
        <Link href="/dashboard/documents">
          <FileText className="h-4 w-4 mr-2" />
          <span>Documents</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 shadow-neon-glow"
        asChild
      >
        <Link href="/dashboard/tools">
          <Zap className="h-4 w-4 mr-2" />
          <span>More Tools</span>
        </Link>
      </Button>
    </div>
  )
}
