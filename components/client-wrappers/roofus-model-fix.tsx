"use client"

import { useEffect, useState } from "react"

export default function RoofusModelFix() {
  const [status, setStatus] = useState<"checking" | "fixed" | "error">("checking")
  const [message, setMessage] = useState("Checking model file...")

  useEffect(() => {
    const checkAndFixModel = async () => {
      try {
        // Check if the model file exists
        const response = await fetch("/models/roofus-character.glb")

        if (!response.ok) {
          setMessage(`Model file not found: ${response.status} ${response.statusText}`)
          setStatus("error")
          return
        }

        // Check content type
        const contentType = response.headers.get("content-type")
        if (
          contentType &&
          !contentType.includes("model/gltf-binary") &&
          !contentType.includes("application/octet-stream")
        ) {
          setMessage(
            `Unexpected content type for GLB file: ${contentType}. Please upload a proper GLB file to /public/models/roofus-character.glb`,
          )
          setStatus("error")
          return
        }

        // Try to read a bit of the file to check if it's actually a PNG
        const buffer = await response.arrayBuffer()
        const bytes = new Uint8Array(buffer.slice(0, 8))
        const header = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")

        if (header.startsWith("89504e47")) {
          setMessage(
            "The GLB file appears to be a PNG file with wrong extension. Please upload a proper GLB file to /public/models/roofus-character.glb",
          )
          setStatus("error")
          return
        }

        setMessage("Model file appears to be valid")
        setStatus("fixed")
      } catch (err) {
        setMessage(`Error checking model: ${err instanceof Error ? err.message : String(err)}`)
        setStatus("error")
      }
    }

    checkAndFixModel()
  }, [])

  if (status === "checking") {
    return null
  }

  if (status === "fixed") {
    return null
  }

  // Only show error message in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-500/20 p-4 rounded-lg border border-red-500/50 max-w-md">
      <h3 className="text-white font-bold mb-2">3D Model Error</h3>
      <p className="text-white text-sm">{message}</p>
    </div>
  )
}
