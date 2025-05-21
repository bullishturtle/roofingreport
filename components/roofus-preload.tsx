"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

export function RoofusPreload() {
  useEffect(() => {
    // Preload the 3D model
    try {
      console.log("Preloading Roofus model")
      useGLTF.preload("/models/roofus-character.glb")
    } catch (e) {
      console.error("Error preloading model:", e)
    }

    return () => {
      // Clean up
      useGLTF.clear()
    }
  }, [])

  return null
}
