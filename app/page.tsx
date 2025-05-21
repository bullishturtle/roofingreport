"use client"

import PageClientWrapper from "@/components/client-wrappers/page-client-wrapper"
import { HeroSearchWrapper } from "@/components/client-wrappers/hero-search-wrapper"

export default function Page() {
  return (
    <PageClientWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HeroSearchWrapper />
      </main>
    </PageClientWrapper>
  )
}
