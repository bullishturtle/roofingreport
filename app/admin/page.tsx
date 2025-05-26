import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Activity, Settings, Database, Shield, BarChart3, Zap } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your RoofFax platform</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Activity className="h-3 w-3 mr-1" />
          System Online
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              View All Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              User Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Role Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Reports & Analytics
            </CardTitle>
            <CardDescription>Monitor platform usage and generate insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Usage Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Performance Metrics
            </Button>
            <Link href="/admin/audit-logs">
              <Button variant="outline" className="w-full justify-start">
                Audit Logs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Services
            </CardTitle>
            <CardDescription>Monitor and configure OpenAI integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              API Usage Stats
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Model Configuration
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Chat Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
            <CardDescription>Database management and monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Database Health
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Backup Status
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Data Export
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Security monitoring and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Security Logs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Access Control
            </Button>
            <Button variant="outline" className="w-full justify-start">
              API Keys
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>Platform configuration and maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              General Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Feature Flags
            </Button>
            <Link href="/admin/site-audit">
              <Button variant="outline" className="w-full justify-start">
                Site Audit
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest system events and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">New user registration</p>
                <p className="text-sm text-muted-foreground">user@example.com joined the platform</p>
              </div>
              <Badge variant="secondary">2 min ago</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Report generated</p>
                <p className="text-sm text-muted-foreground">Roof inspection report for 123 Main St</p>
              </div>
              <Badge variant="secondary">5 min ago</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">AI chat session</p>
                <p className="text-sm text-muted-foreground">Roofus assisted with building code inquiry</p>
              </div>
              <Badge variant="secondary">8 min ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
