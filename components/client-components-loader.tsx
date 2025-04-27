"use client"

import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { SimpleRoofusModel } from "@/components/3d/simple-roofus-model"
import { SimpleActionBar } from "@/components/simple-action-bar"
import { SimpleRoofusAssistant } from "@/components/simple-roofus-assistant"

export function ClientComponentsLoader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Replace the 3D model placeholder
    const modelContainer = document.querySelector("#model-container")
    if (modelContainer) {
      modelContainer.innerHTML = ""
      const modelRoot = document.createElement("div")
      modelRoot.style.width = "100%"
      modelRoot.style.height = "100%"
      modelContainer.appendChild(modelRoot)

      // Render the 3D model
      const root = createRoot(modelRoot)
      root.render(<SimpleRoofusModel />)
    }

    // Replace the action bar
    const actionBarContainer = document.querySelector("#action-bar-container")
    if (actionBarContainer) {
      actionBarContainer.innerHTML = ""
      const actionBarRoot = document.createElement("div")
      actionBarContainer.appendChild(actionBarRoot)

      // Render the action bar
      const root = createRoot(actionBarRoot)
      root.render(<SimpleActionBar />)
    }

    // Add the AI assistant
    const mountPoint = document.querySelector("#client-components-mount-point")
    if (mountPoint) {
      const assistantRoot = document.createElement("div")
      mountPoint.appendChild(assistantRoot)

      // Render the AI assistant
      const root = createRoot(assistantRoot)
      root.render(<SimpleRoofusAssistant />)
    }
  }, [])

  return null
}
