"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

// Fix double slashes in URLs
const fixUrl = (url: string) => url.replace("//", "/")

// Character model and animations from Supabase public URLs
const MODELS = {
  CHARACTER: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//character.glb"),
  IDLE: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb"),
  WALK: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//walk.glb"),
}

export default function Preload() {
  useEffect(() => {
    // Preload the most commonly used 3D models
    try {
      // Only preload the most commonly used animations to save bandwidth
      useGLTF.preload(MODELS.IDLE)
      useGLTF.preload(MODELS.WALK)
      console.log("Preloaded Roofus 3D models from Supabase public URLs")
    } catch (error) {
      console.error("Failed to preload Roofus 3D models:", error)
    }
  }, [])

  return null
}
