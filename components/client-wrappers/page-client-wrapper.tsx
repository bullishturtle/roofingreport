"use client"

import { HeroSearchWrapper } from "./hero-search-wrapper"
import { ActionBarWrapper } from "./action-bar-wrapper"
import { MobileActionDrawerWrapper } from "./mobile-action-drawer-wrapper"
import { StarsBackground } from "./stars-background"

export function PageClientWrapper() {
  return (
    <>
      <StarsBackground />
      <HeroSearchWrapper />
      <ActionBarWrapper />
      <MobileActionDrawerWrapper />
      {/* Roofus implementation has been removed */}
    </>
  )
}
