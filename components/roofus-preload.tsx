"use client"

import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"

export function RoofusPreload() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if the model file exists and is valid before preloading
    const checkAndPreload = async () => {
      try {
        console.log("Checking Roofus model before preloading")
        const response = await fetch("/models/roofus-character.glb")

        if (!response.ok) {
          throw new Error(`Model file not found: ${response.status} ${response.statusText}`)
        }

        // Check content type
        const contentType = response.headers.get("content-type")
        if (
          contentType &&
          !contentType.includes("model/gltf-binary") &&
          !contentType.includes("application/octet-stream")
        ) {
          console.warn(`Unexpected content type for GLB file: ${contentType}`)

          // Try to read a bit of the file to check if it's actually a PNG
          const buffer = await response.arrayBuffer()
          const bytes = new Uint8Array(buffer.slice(0, 8))
          const header = Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")

          if (header.startsWith("89504e47")) {
            throw new Error("The GLB file appears to be a PNG file with wrong extension")
          }
        }

        // If we got here, the file exists and should be loadable
        console.log("Model file exists and is valid, preloading...")
        useGLTF.preload("/models/roofus-character.glb")
      } catch (err) {
        console.error("Error preloading model:", err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    checkAndPreload()

    return () => {
      // Clean up
      useGLTF.clear()
    }
  }, [])

  // We don't need to render anything, but we could log the error if needed
  if (error) {
    console.error("Preload error:", error)
  }

  return null
}
