"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { useUser } from "@/contexts/user-context"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <UserDashboard />
}
