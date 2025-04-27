"use client"

import { useState, useEffect } from "react"

export const useMediaQuery = (query: string): boolean => {
  // Default to false during SSR
  const [matches, setMatches] = useState(false)
  // Track if component is mounted
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Only run in browser environment
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)

    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    // Set initial value
    handleChange()

    // Add event listener
    try {
      // Modern browsers
      mediaQuery.addEventListener("change", handleChange)
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    } catch (e) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  // Return false during SSR, actual value after mount
  return mounted ? matches : false
}

export default useMediaQuery
