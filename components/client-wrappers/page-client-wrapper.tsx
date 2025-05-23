"use client"
import dynamic from "next/dynamic"
import { ClientWrapperProvider, useClientWrapper } from "./client-wrapper-provider"

// Import client components with dynamic imports
const RoofusAssistantWrapper = dynamic(() => import("./roofus-assistant-wrapper"), {
  ssr: false,
  loading: () => null,
})

const Animated3DCharactersWrapper = dynamic(() => import("./animated-3d-characters-wrapper"), {
  ssr: false,
  loading: () => null,
})

const ActionBarWrapper = dynamic(() => import("./action-bar-wrapper"), {
  ssr: false,
  loading: () => null,
})

const MobileActionDrawerWrapper = dynamic(() => import("./mobile-action-drawer-wrapper"), {
  ssr: false,
  loading: () => null,
})

const StarsBackground = dynamic(() => import("./stars-background"), {
  ssr: false,
  loading: () => null,
})

function ClientComponents() {
  const { isMounted, hasRenderingError } = useClientWrapper()

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StarsBackground />
      {!hasRenderingError && <Animated3DCharactersWrapper />}
      <RoofusAssistantWrapper />
      <MobileActionDrawerWrapper />
      <ActionBarWrapper />
    </>
  )
}

export default function PageClientWrapper() {
  return (
    <ClientWrapperProvider>
      <ClientComponents />
    </ClientWrapperProvider>
  )
}
