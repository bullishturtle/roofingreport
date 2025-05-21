"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

// Character model from Supabase public URL
const CHARACTER_MODEL_URL =
  "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/character.glb"

export default function Preload() {
  useEffect(() => {
    // Preload the 3D model
    try {
      useGLTF.preload(CHARACTER_MODEL_URL)
      console.log("Preloaded Roofus 3D model from Supabase public URL")
    } catch (error) {
      console.error("Failed to preload Roofus 3D model:", error)
    }
  }, [])

  return null
}
