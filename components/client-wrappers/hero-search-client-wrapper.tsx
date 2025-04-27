"use client"

import dynamic from "next/dynamic"

const HeroSearch = dynamic(() => import("../hero-search").then((mod) => mod.HeroSearch), {
  ssr: false,
  loading: () => <div className="h-10 w-full max-w-md bg-black/30 rounded-md animate-pulse"></div>,
})

export default function HeroSearchClientWrapper() {
  return <HeroSearch />
}
