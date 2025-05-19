"use client"

import { useState, useEffect } from "react"
import { breakpoints } from "@/lib/responsive-utils"

type DeviceType = "mobile" | "tablet" | "desktop"
type Orientation = "portrait" | "landscape"

interface ResponsiveInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  deviceType: DeviceType
  orientation: Orientation
  width: number
  height: number
  isPortrait: boolean
  isLandscape: boolean
  isTouchDevice: boolean
}

export function useResponsive(): ResponsiveInfo {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024)
  const [height, setHeight] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 768)

  const isMobile = width < breakpoints.md
  const isTablet = width >= breakpoints.md && width < breakpoints.lg
  const isDesktop = width >= breakpoints.lg

  const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
  const orientation: Orientation = width > height ? "landscape" : "portrait"

  const isPortrait = orientation === "portrait"
  const isLandscape = orientation === "landscape"

  // Check if device has touch capabilities
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0,
      )
    }

    // Initial checks
    handleResize()
    checkTouch()

    // Add event listeners
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
    orientation,
    width,
    height,
    isPortrait,
    isLandscape,
    isTouchDevice,
  }
}

// Legacy hook for backward compatibility
export function useMobile(breakpoint = breakpoints.md): boolean {
  const { width } = useResponsive()
  return width < breakpoint
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the screen is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Function to check if the screen is tablet-sized
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1024)
    }

    // Initial check
    checkTablet()

    // Add event listener for window resize
    window.addEventListener("resize", checkTablet)

    // Cleanup
    return () => window.removeEventListener("resize", checkTablet)
  }, [])

  return isTablet
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("unknown")

  useEffect(() => {
    // Function to determine current breakpoint
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) return setBreakpoint("xs")
      if (width < 768) return setBreakpoint("sm")
      if (width < 1024) return setBreakpoint("md")
      if (width < 1280) return setBreakpoint("lg")
      return setBreakpoint("xl")
    }

    // Initial check
    checkBreakpoint()

    // Add event listener for window resize
    window.addEventListener("resize", checkBreakpoint)

    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  return breakpoint
}

export default useResponsive
