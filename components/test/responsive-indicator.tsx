"use client"

import { useState, useEffect } from "react"

export function ResponsiveIndicator() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Update window width on mount
    setWindowWidth(window.innerWidth)

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getBreakpointName = (width: number) => {
    if (width < 640) return "xs"
    if (width < 768) return "sm"
    if (width < 1024) return "md"
    if (width < 1280) return "lg"
    if (width < 1536) return "xl"
    return "2xl"
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <div className="bg-black/80 text-white px-3 py-1.5 text-sm rounded-full shadow-lg">
        <span className="hidden sm:inline md:hidden">SM</span>
        <span className="hidden md:inline lg:hidden">MD</span>
        <span className="hidden lg:inline xl:hidden">LG</span>
        <span className="hidden xl:inline 2xl:hidden">XL</span>
        <span className="hidden 2xl:inline">2XL</span>
        <span className="inline sm:hidden">XS</span>
      </div>
      <div className="bg-black/80 text-white px-3 py-1.5 text-sm rounded-full shadow-lg">{windowWidth}px</div>
    </div>
  )
}
