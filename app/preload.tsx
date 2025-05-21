"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

// Define the path to the GLB model
const ROOFUS_MODEL_PATH = "/models/roofus-character.glb"

export default function Preload() {
  useEffect(() => {
    // Preload the 3D model
    try {
      useGLTF.preload(ROOFUS_MODEL_PATH)
      console.log("Preloaded Roofus 3D model")
    } catch (error) {
      console.error("Failed to preload Roofus 3D model:", error)
    }

    // Preload any other assets here
  }, [])

  return null
}
