"use client"

import dynamic from "next/dynamic"

const Animated3DCharacters = dynamic(() => import("@/components/3d-characters/animated-3d-characters"), { ssr: false })

export default function Animated3DCharactersWrapper() {
  return <Animated3DCharacters />
}
