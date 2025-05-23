import type { Metadata } from "next"
import OfflinePageClient from "./OfflinePageClient"

export const metadata: Metadata = {
  title: "You're Offline | RoofFax",
  description: "You're currently offline. Please check your internet connection.",
}

export default function OfflinePage() {
  return <OfflinePageClient />
}
