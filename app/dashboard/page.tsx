"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { logUserAction } from "@/lib/utils"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      logUserAction("Unauthorized dashboard access attempt")
      router.push("/login")
    } else if (user) {
      logUserAction("Dashboard accessed", { userId: user.id, role: user.role })
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-gray-600">
                {user.role === "homeowner"
                  ? "Manage your property reports and roof information."
                  : "Access your client reports and project information."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => {
                        logUserAction("Quick action: New report")
                        router.push("/")
                      }}
                      className="text-orange-500 hover:text-orange-700 font-medium"
                    >
                      Generate a new report
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logUserAction("Quick action: View reports")
                      }}
                      className="text-orange-500 hover:text-orange-700 font-medium"
                    >
                      View my reports
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logUserAction("Quick action: Account settings")
                      }}
                      className="text-orange-500 hover:text-orange-700 font-medium"
                    >
                      Account settings
                    </button>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <p className="text-gray-500 italic">No recent activity to display.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Account type:</span>{" "}
                    {user.role === "homeowner" ? "Homeowner" : "Contractor"}
                  </p>
                  <p>
                    <span className="font-medium">Member since:</span> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {user.role === "homeowner" ? "My Properties" : "My Clients"}
              </h2>
              <p className="text-gray-500 italic mb-4">
                {user.role === "homeowner"
                  ? "You haven't added any properties yet."
                  : "You haven't added any clients yet."}
              </p>
              <button
                onClick={() => {
                  logUserAction(`Add ${user.role === "homeowner" ? "property" : "client"} clicked`)
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add {user.role === "homeowner" ? "Property" : "Client"}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
