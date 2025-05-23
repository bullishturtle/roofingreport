"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface OfflineContextType {
  isOnline: boolean
  isOfflineReady: boolean
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined)

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [isOfflineReady, setIsOfflineReady] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
          setIsOfflineReady(true)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    }

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "Back Online",
        description: "Your connection has been restored.",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "You're Offline",
        description: "Some features may be limited while offline.",
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Set initial state
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  return <OfflineContext.Provider value={{ isOnline, isOfflineReady }}>{children}</OfflineContext.Provider>
}

export function useOffline() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error("useOffline must be used within an OfflineProvider")
  }
  return context
}
