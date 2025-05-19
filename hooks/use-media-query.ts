"use client"

import { useState, useEffect } from "react"

export const useMediaQuery = (query: string): boolean => {
  // Default to false on server-side
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Define listener function
    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    // Use safer event listener pattern
    try {
      // Modern browsers
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } catch (e) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}
