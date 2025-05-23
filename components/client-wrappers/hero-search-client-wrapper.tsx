"use client"
import dynamic from "next/dynamic"
import { useClientWrapper } from "./client-wrapper-provider"

const HeroSearch = dynamic(() => import("../hero-search").then((mod) => mod.HeroSearch), {
  ssr: false,
  loading: () => <div className="h-10 w-full max-w-md bg-black/30 rounded-md animate-pulse"></div>,
})

export default function HeroSearchClientWrapper() {
  const { isMounted } = useClientWrapper()

  if (!isMounted) {
    return <div className="h-10 w-full max-w-md bg-black/30 rounded-md"></div>
  }

  return <HeroSearch />
}
