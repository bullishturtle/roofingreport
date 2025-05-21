"use client"

import { useState, useEffect } from "react"
import { TwoDRoofusFallback } from "./2d-roofus-fallback"
import dynamic from "next/dynamic"

// Dynamically import the 3D Roofus component with no SSR
const ThreeDRoofus = dynamic(() => import("./3d-roofus").then((mod) => mod.ThreeDRoofus), {
  ssr: false,
  loading: () => null,
})

export function RoofusAssistant() {
  const [mounted, setMounted] = useState(false)
  const [has3DSupport, setHas3DSupport] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modelError, setModelError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      const hasSupport = !!gl
      console.log("WebGL support detected:", hasSupport)
      setHas3DSupport(hasSupport)
    } catch (e) {
      console.error("Error checking WebGL support:", e)
      setHas3DSupport(false)
    }

    // Check if the model file exists and is valid
    const checkModelFile = async () => {
      try {
        const response = await fetch("/models/roofus-character.glb")

        if (!response.ok) {
          console.error(`Model file not found: ${response.status} ${response.statusText}`)
          setModelError(true)
          return
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
            console.error("The GLB file appears to be a PNG file with wrong extension")
            setModelError(true)
          }
        }
      } catch (err) {
        console.error("Error checking model file:", err)
        setModelError(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkModelFile()
  }, [])

  if (!mounted || isLoading) return null

  // Use the 2D fallback if WebGL is not supported or if there's a model error
  if (!has3DSupport || modelError) {
    console.log("Using 2D fallback for Roofus due to:", !has3DSupport ? "No WebGL support" : "Model error")
    return <TwoDRoofusFallback />
  }

  // Use the 3D implementation if WebGL is supported
  console.log("Using 3D implementation for Roofus")
  return <ThreeDRoofus />
}
