"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type RoofusAction =
  | "idle"
  | "excited"
  | "point"
  | "measure"
  | "storm"
  | "search"
  | "document"
  | "chat"
  | "protect"
  | "goHome"
  | "comeBack"

interface RoofusContextType {
  currentAction: RoofusAction
  triggerRoofusAction: (action: RoofusAction) => void
  isUserChasing: boolean
  setUserChasing: (chasing: boolean) => void
  generateRoofDamageReport: () => string
  startScrapingData: () => void
}

const RoofusContext = createContext<RoofusContextType | undefined>(undefined)

export function RoofusProvider({ children }: { children: ReactNode }) {
  const [currentAction, setCurrentAction] = useState<RoofusAction>("idle")
  const [isUserChasing, setIsUserChasing] = useState(false)

  // Function to generate a roof damage report from the mock data
  const generateRoofDamageReport = () => {
    const mockData = [
      "No visible damage.",
      "Minor hail damage detected.",
      "Severe damage with potential leaks.",
      "Full roof replacement recommended due to storm damage.",
    ]
    return mockData[Math.floor(Math.random() * mockData.length)]
  }

  // Function to trigger Roofus actions
  const triggerRoofusAction = (action: RoofusAction) => {
    setCurrentAction(action)
  }

  const setUserChasing = (chasing: boolean) => {
    setIsUserChasing(chasing)
  }

  // Simulate the start of data scraping
  const startScrapingData = () => {
    console.log("Roofus is starting to scrape data...")
    // In a real app, this would connect to an API or service
    triggerRoofusAction("search")
    setTimeout(() => {
      triggerRoofusAction("document")
      console.log("Roof damage data fetched and processed!")
    }, 2000)
  }

  return (
    <RoofusContext.Provider
      value={{
        currentAction,
        triggerRoofusAction,
        isUserChasing,
        setUserChasing,
        generateRoofDamageReport,
        startScrapingData,
      }}
    >
      {children}
    </RoofusContext.Provider>
  )
}

export function useRoofus() {
  const context = useContext(RoofusContext)
  if (context === undefined) {
    throw new Error("useRoofus must be used within a RoofusProvider")
  }
  return context
}
