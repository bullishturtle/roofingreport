"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

export function Preload() {
  useEffect(() => {
    // Preload the 3D model
    useGLTF.preload("/models/roofus-character.glb")

    return () => {
      // Clean up
      useGLTF.clear()
    }
  }, [])

  return null
}
