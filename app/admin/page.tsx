"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, AlertCircle, CheckCircle, Phone, Mail, MapPin } from "lucide-react"

export default function AdminPage() {
  const [signups, setSignups] = useState([])
  const [hotLeads, setHotLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [signupsRes, hotLeadsRes] = await Promise.all([fetch("/api/admin/signups"), fetch("/api/admin/hot-leads")])

      const signupsData = await signupsRes.json()
      const hotLeadsData = await hotLeadsRes.json()

      setSignups(signupsData.signups || [])
      setHotLeads(hotLeadsData.hotLeads || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const mockSignups = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "(850) 555-0123",
      address: "123 Main St, Pensacola, FL",
      services: ["Roof Inspection", "Repair"],
      urgency: "Soon",
      created_at: "2024-01-15T10:30:00Z",
      status: "new",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(850) 555-0456",
      address: "456 Oak Ave, Gulf Breeze, FL",
      services: ["Roof Replacement"],
      urgency: "Planning",
      created_at: "2024-01-14T14:20:00Z",
      status: "contacted",
    },
  ]

  const mockHotLeads = [
    {
      id: 1,
      name: "Mike Davis",
      phone: "(850) 555-0789",
      address: "789 Pine St, Navarre, FL",
      urgency: "Critical",
      issue: "Active leak in living room after storm",
      services: ["Emergency Leak Repair", "Storm Damage Assessment"],
      created_at: "2024-01-15T08:45:00Z",
      status: "urgent",
    },
  ]

  const displaySignups = signups.length > 0 ? signups : mockSignups
  const displayHotLeads = hotLeads.length > 0 ? hotLeads : mockHotLeads

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New</Badge>
      case "contacted":
        return <Badge variant="secondary">Contacted</Badge>
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "completed":
        return <Badge variant="outline">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "critical":
        return "text-red-600 font-bold"
      case "urgent":
        return "text-orange-600 font-semibold"
      case "soon":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RoofFax Admin Dashboard</h1>
          <p className="text-gray-600">Manage leads, track pro contacts, and monitor system performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displaySignups.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayHotLeads.length}</div>
              <p className="text-xs text-muted-foreground">Urgent requests today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pro Matches</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Successful connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">Pro response within 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="signups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signups">Regular Signups</TabsTrigger>
            <TabsTrigger value="hot-leads">Hot Leads</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Regular Signups Tab */}
          <TabsContent value="signups" className="space-y-4">
            {displaySignups.map((signup: any) => (
              <Card key={signup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{signup.name}</CardTitle>
                      <CardDescription>Submitted {new Date(signup.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    {getStatusBadge(signup.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{signup.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{signup.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{signup.address}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Services: </span>
                        {Array.isArray(signup.services) ? signup.services.join(", ") : signup.services}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Urgency: </span>
                        <span className={getUrgencyColor(signup.urgency)}>{signup.urgency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Pro Contact</Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark Contacted
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Hot Leads Tab */}
          <TabsContent value="hot-leads" className="space-y-4">
            {displayHotLeads.map((lead: any) => (
              <Card key={lead.id} className="border-red-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        {lead.name}
                      </CardTitle>
                      <CardDescription>
                        Emergency request - {new Date(lead.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800 mb-1">Issue Description:</div>
                      <p className="text-red-700 text-sm">{lead.issue}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{lead.address}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Urgency: </span>
                          <span className={getUrgencyColor(lead.urgency)}>{lead.urgency}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Services: </span>
                          {Array.isArray(lead.services) ? lead.services.join(", ") : lead.services}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Emergency Dispatch
                    </Button>
                    <Button size="sm" variant="outline">
                      Call Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
