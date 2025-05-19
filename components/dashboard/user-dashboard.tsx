"use client"

import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User, Mail, Calendar, Home, Briefcase, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export function UserDashboard() {
  const { user, logout } = useUser()
  const { showToast } = useToast()

  if (!user) return null

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleLogout = () => {
    logout()
    showToast("You have been logged out", "info")
  }

  const handlePortalRedirect = () => {
    if (user.userType === "Homeowner") {
      showToast("Homeowner portal coming soon!", "info")
    } else if (user.userType === "Pro") {
      showToast("Pro portal coming soon!", "info")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Account Information</CardTitle>
            <CardDescription className="text-gray-400">Your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              {user.userType === "Homeowner" ? (
                <Home className="h-5 w-5 text-yellow-500 mr-3" />
              ) : (
                <Briefcase className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <div>
                <p className="text-sm text-gray-400">Account Type</p>
                <p className="text-white">{user.userType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Account Activity</CardTitle>
            <CardDescription className="text-gray-400">Your recent activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Account Created</p>
                <p className="text-white">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Last Login</p>
                <p className="text-white">{formatDate(user.lastLogin)}</p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handlePortalRedirect}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {user.userType === "Homeowner"
                  ? "Go to Homeowner Portal (Coming Soon)"
                  : "Go to Pro Portal (Coming Soon)"}
              </Button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {user.userType === "Homeowner"
                  ? "trustthefox.com - Your homeowner portal is coming soon"
                  : "rooffaxpro.com - Your pro portal is coming soon"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
