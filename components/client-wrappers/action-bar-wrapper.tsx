"use client"

import dynamic from "next/dynamic"

const ActionBar = dynamic(() => import("@/components/action-bar"), { ssr: false })

export default function ActionBarWrapper() {
  return <ActionBar />
}
