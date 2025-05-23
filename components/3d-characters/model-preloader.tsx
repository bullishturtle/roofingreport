"use client"

import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"

// Character models
const ROOFUS_MODEL_URL = "/models/roofus-character.glb"
const LANDON_MODEL_URL = "/models/landon-character.glb"

export function ModelPreloader() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Preload models
        await Promise.all([
          new Promise((resolve, reject) => {
            useGLTF.load(ROOFUS_MODEL_URL, resolve, undefined, (error) => {
              console.warn(`Error preloading Roofus model: ${error.message}`)
              reject(error)
            })
          }),
          new Promise((resolve, reject) => {
            useGLTF.load(LANDON_MODEL_URL, resolve, undefined, (error) => {
              console.warn(`Error preloading Landon model: ${error.message}`)
              reject(error)
            })
          }),
        ])

        setLoaded(true)
        console.log("3D models preloaded successfully")
      } catch (err) {
        console.error("Error preloading 3D models:", err)
        setError(err instanceof Error ? err : new Error("Unknown error preloading models"))
      }
    }

    loadModels()
  }, [])

  // This component doesn't render anything visible
  return null
}
