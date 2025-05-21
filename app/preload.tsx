"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

// Animation URLs from Supabase
const ANIMATIONS = {
  IDLE: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/idle.glb",
  WALK: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/walk.glb",
  RUN: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/run.glb",
  JUMP: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/jump.glb",
  CLIMB: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/climb.glb",
}

export default function Preload() {
  useEffect(() => {
    // Preload the 3D models
    try {
      // Only preload the most commonly used animations to save bandwidth
      useGLTF.preload(ANIMATIONS.IDLE)
      useGLTF.preload(ANIMATIONS.WALK)
      console.log("Preloaded Roofus 3D models from Supabase")
    } catch (error) {
      console.error("Failed to preload Roofus 3D models:", error)
    }
  }, [])

  return null
}
