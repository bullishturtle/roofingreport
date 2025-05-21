"use client"

import PageClientWrapper from "@/components/client-wrappers/page-client-wrapper"
import { HeroSearchWrapper } from "@/components/client-wrappers/hero-search-wrapper"
import Link from "next/link"

export default function Page() {
  return (
    <PageClientWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HeroSearchWrapper />

        {/* Admin link - remove in production */}
        <div className="fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
          <Link href="/animation-test" className="text-xs text-gray-400 hover:text-neon-gold">
            Animation Test
          </Link>
        </div>
      </main>
    </PageClientWrapper>
  )
}
