"use client"

import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

// Fix URL formatting function
const fixUrl = (url: string) => {
  // Ensure protocol has double slashes
  let fixedUrl = url.replace("https:/", "https://")
  // Fix double slashes in the path (but not in the protocol)
  fixedUrl = fixedUrl.replace("//roofus-models//", "/roofus-models/")
  return fixedUrl
}

// We'll use only the idle animation for now
const IDLE_URL = fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb")

export default function Preload() {
  useEffect(() => {
    // Preload the idle model
    try {
      useGLTF.preload(IDLE_URL)
      console.log("Preloaded Roofus idle animation")
    } catch (error) {
      console.error("Failed to preload Roofus model:", error)
    }
  }, [])

  return null
}
