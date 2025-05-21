"use client"

import dynamic from "next/dynamic"

// Dynamically import the 3D characters wrapper with no SSR
const Enhanced3DCharactersWrapper = dynamic(
  () => import("@/components/client-wrappers/enhanced-3d-characters-wrapper"),
  {
    ssr: false,
    loading: () => null,
  },
)

export function Enhanced3DCharactersClient() {
  return <Enhanced3DCharactersWrapper />
}
