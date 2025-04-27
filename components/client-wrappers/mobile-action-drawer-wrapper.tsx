"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const MobileActionDrawer = dynamic(() => import("../mobile-action-drawer").then((mod) => mod.MobileActionDrawer), {
  loading: () => null,
})

export default function MobileActionDrawerWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <MobileActionDrawer />
}
