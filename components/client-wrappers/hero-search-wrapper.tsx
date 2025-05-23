"use client"

import dynamic from "next/dynamic"

const HeroSearch = dynamic(() => import("../hero-search").then((mod) => mod.HeroSearch), {
  ssr: false,
  loading: () => null,
})

export default function HeroSearchWrapper() {
  return <HeroSearch />
}
