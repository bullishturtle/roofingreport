"use client"
import dynamic from "next/dynamic"

// Dynamically import the preload component with ssr: false
const RoofusPreload = dynamic(() => import("@/components/roofus-preload").then((mod) => mod.RoofusPreload), {
  ssr: false,
})

export default function RoofusPreloadWrapper() {
  return <RoofusPreload />
}
