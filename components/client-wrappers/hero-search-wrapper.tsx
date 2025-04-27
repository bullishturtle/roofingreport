"use client"

import dynamic from "next/dynamic"

const HeroSearch = dynamic(() => import("@/components/hero-search"), { ssr: false })

export default function HeroSearchWrapper() {
  return <HeroSearch />
}
