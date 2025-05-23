"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

type ClientWrapperContextType = {
  isMounted: boolean
  hasRenderingError: boolean
  setRenderingError: (hasError: boolean) => void
}

const ClientWrapperContext = createContext<ClientWrapperContextType>({
  isMounted: false,
  hasRenderingError: false,
  setRenderingError: () => {},
})

export function useClientWrapper() {
  return useContext(ClientWrapperContext)
}

export function ClientWrapperProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasRenderingError, setHasRenderingError] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Global error handler for client-side runtime errors
    const handleError = () => {
      setHasRenderingError(true)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  const setRenderingError = (hasError: boolean) => {
    setHasRenderingError(hasError)
  }

  return (
    <ClientWrapperContext.Provider value={{ isMounted, hasRenderingError, setRenderingError }}>
      {children}
    </ClientWrapperContext.Provider>
  )
}
