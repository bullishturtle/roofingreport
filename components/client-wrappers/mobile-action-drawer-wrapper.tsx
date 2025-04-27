"use client"

import dynamic from "next/dynamic"

const MobileActionDrawer = dynamic(() => import("@/components/mobile-action-drawer"), { ssr: false })

export default function MobileActionDrawerWrapper() {
  return <MobileActionDrawer />
}
