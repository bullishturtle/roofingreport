"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { Home, FileText, Settings, Plus, Download } from "lucide-react"
import AddressSearchForm from "@/components/address-search-form"
import { useRouter } from "next/navigation"
import RecentReportsTable from "@/components/dashboard/recent-reports-table"
import StatsCards from "@/components/dashboard/stats-cards"

export default function UserDashboard() {
  const { user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for recent reports
  const recentReports = [
    {
      id: "1",
      address: "123 Main St, Anytown, USA",
      date: "2023-05-15",
      condition: "Good",
    },
    {
      id: "2",
      address: "456 Oak Ave, Somewhere, USA",
      date: "2023-04-22",
      condition: "Fair",
    },
    {
      id: "3",
      address: "789 Pine Rd, Nowhere, USA",
      date: "2023-03-10",
      condition: "Excellent",
    },
  ]

  const handleViewReport = (reportId: string) => {
    // In a real app, this would navigate to the specific report
    // For now, we'll just store the address in sessionStorage and navigate to the report page
    const report = recentReports.find((r) => r.id === reportId)
    if (report) {
      sessionStorage.setItem("rooffax_search_address", report.address)
      router.push("/report")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
      <p className="text-gray-600 mb-8">Manage your roof reports and account settings</p>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">
            <Home className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            My Reports
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <StatsCards />

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Your most recent roof reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReportsTable reports={recentReports} onView={handleViewReport} />

                  {recentReports.length > 0 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" onClick={() => setActiveTab("reports")}>
                        View All Reports
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>New Report</CardTitle>
                  <CardDescription>Generate a new roof report</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddressSearchForm />
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("reports")}>
                      <FileText className="mr-2 h-4 w-4" />
                      View All Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Download Latest Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Property
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Reports</CardTitle>
                  <CardDescription>All your roof reports in one place</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecentReportsTable reports={recentReports} onView={handleViewReport} showPagination />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="email-notifications" className="ml-2 text-gray-700">
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="report-updates"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="report-updates" className="ml-2 text-gray-700">
                        Report updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="marketing" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="marketing" className="ml-2 text-gray-700">
                        Marketing communications
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
