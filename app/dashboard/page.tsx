import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RecentReportsTable } from "@/components/dashboard/recent-reports-table"
import { NeighborhoodMap } from "@/components/dashboard/neighborhood-map"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Plus, Search, Settings, Users } from "lucide-react"
import Link from "next/link"
import { FileUpload } from "@/components/dashboard/file-upload"
import { WeatherWidget } from "@/components/dashboard/weather-widget"

// Static version of StatsCards for SSR
function StaticStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total Reports",
          icon: <FileText className="h-4 w-4 text-blue-400" />,
          value: "1,284",
          percent: "18%",
        },
        { title: "Active Leads", icon: <Users className="h-4 w-4 text-purple-400" />, value: "342", percent: "12%" },
        {
          title: "Pending Projects",
          icon: <Settings className="h-4 w-4 text-cyan-400" />,
          value: "86",
          percent: "7%",
        },
        {
          title: "Completed Jobs",
          icon: <Download className="h-4 w-4 text-green-400" />,
          value: "624",
          percent: "24%",
        },
      ].map((stat, index) => (
        <Card key={index} className="border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-white/70 flex items-center">
              <span className="mr-1 text-green-500">↗</span>
              <span className="text-green-500 font-medium">{stat.percent}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Manage your reports, leads, and projects all in one place.">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-neon-blue"
          >
            <Link href="/dashboard/new-report">
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Link>
          </Button>
        </DashboardHeader>
        <div className="grid gap-4 md:gap-8">
          {/* Use static version for SSR */}
          <StaticStatsCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-5 border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Reports</CardTitle>
                <CardDescription className="text-white/70">
                  Your most recent roof reports and their status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentReportsTable />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link href="/dashboard/reports">
                    View All Reports <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-2 border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/70">Common tasks and shortcuts.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button
                  variant="outline"
                  className="justify-start border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  asChild
                >
                  <Link href="/dashboard/new-report">
                    <Search className="mr-2 h-4 w-4" />
                    New Address Lookup
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  asChild
                >
                  <Link href="/dashboard/proposals">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Proposal
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  asChild
                >
                  <Link href="/dashboard/team">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-green-500/30 text-green-400 hover:bg-green-500/10"
                  asChild
                >
                  <Link href="/dashboard/reports">
                    <Download className="mr-2 h-4 w-4" />
                    Export Reports
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  asChild
                >
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* New row with Weather Widget and File Upload */}
          <div className="grid gap-4 md:grid-cols-2">
            <WeatherWidget />
            <FileUpload />
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto bg-white/5 border border-white/10">
              <TabsTrigger value="map" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                Neighborhood Map
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="border rounded-md p-4 border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Neighborhood Activity</h3>
                  <p className="text-sm text-white/70">Recent roof activity in your target areas.</p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-green-500/30 text-green-400 bg-green-500/10"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> New Leads
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-blue-500/30 text-blue-400 bg-blue-500/10"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span> Recent Claims
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-amber-500/30 text-amber-400 bg-amber-500/10"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span> Completed Jobs
                  </Badge>
                </div>
              </div>
              <NeighborhoodMap />
            </TabsContent>
            <TabsContent value="calendar" className="border rounded-md p-4 border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Appointment Calendar</h3>
                  <p className="text-sm text-white/70">Schedule and manage your appointments and follow-ups.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="analytics"
              className="border rounded-md p-4 border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Performance Analytics</h3>
                  <p className="text-sm text-white/70">Track your team's performance and conversion rates.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>
    </>
  )
}
