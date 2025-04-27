"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import ReactDOM from "react-dom/client"

// Dynamically import client components with no SSR
const InteractiveRoofus = dynamic(
  () => import("@/components/3d/interactive-roofus").then((mod) => mod.InteractiveRoofus),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-neon-gold">Loading 3D Model...</div>
      </div>
    ),
  },
)

const RoofusAIAssistant = dynamic(
  () => import("@/components/roofus-ai-assistant").then((mod) => mod.RoofusAIAssistant),
  {
    ssr: false,
  },
)

const ActionBar = dynamic(() => import("@/components/action-bar").then((mod) => mod.ActionBar), {
  ssr: false,
})

export function ClientComponents() {
  useEffect(() => {
    // Replace the 3D model placeholder
    const modelContainer = document.querySelector("#model-container")
    if (modelContainer) {
      modelContainer.innerHTML = ""
      const modelRoot = document.createElement("div")
      modelRoot.style.width = "100%"
      modelRoot.style.height = "100%"
      modelContainer.appendChild(modelRoot)

      // Render the 3D model
      const root = ReactDOM.createRoot(modelRoot)
      root.render(<InteractiveRoofus />)
    }

    // Replace the action bar
    const actionBarContainer = document.querySelector("#action-bar-container")
    if (actionBarContainer) {
      actionBarContainer.innerHTML = ""
      const actionBarRoot = document.createElement("div")
      actionBarContainer.appendChild(actionBarRoot)

      // Render the action bar
      const root = ReactDOM.createRoot(actionBarRoot)
      root.render(<ActionBar />)
    }

    // Add the AI assistant
    const mountPoint = document.querySelector("#client-components-mount-point")
    if (mountPoint) {
      const assistantRoot = document.createElement("div")
      mountPoint.appendChild(assistantRoot)

      // Render the AI assistant
      const root = ReactDOM.createRoot(assistantRoot)
      root.render(<RoofusAIAssistant />)
    }
  }, [])

  return null
}
