"use client"

import { useState, useEffect } from "react"
import { HeroSearch } from "@/components/hero-search"

export default function HeroSearchClientWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full max-w-md h-12 bg-black/30 rounded-md animate-pulse"></div>
  }

  return <HeroSearch />
}
