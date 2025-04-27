"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ActionBar = dynamic(() => import("../action-bar").then((mod) => mod.ActionBar), {
  loading: () => null,
})

export default function ActionBarWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <ActionBar />
}
