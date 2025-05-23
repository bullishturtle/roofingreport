"use client"
import dynamic from "next/dynamic"
import { ClientWrapperProvider, useClientWrapper } from "./client-wrapper-provider"

// Import client components with dynamic imports
const RoofusAssistantDashboardWrapper = dynamic(() => import("./roofus-assistant-dashboard-wrapper"), {
  ssr: false,
  loading: () => null,
})

const StatsCardsWrapper = dynamic(() => import("./stats-cards-wrapper"), {
  ssr: false,
  loading: () => null,
})

function ClientComponents() {
  const { isMounted } = useClientWrapper()

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RoofusAssistantDashboardWrapper />
      <StatsCardsWrapper />
    </>
  )
}

export default function DashboardClientWrapper() {
  return (
    <ClientWrapperProvider>
      <ClientComponents />
    </ClientWrapperProvider>
  )
}
