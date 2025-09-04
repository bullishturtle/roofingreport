"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, AlertTriangle, CheckCircle, Phone, Mail, MapPin, Calendar, Search } from "lucide-react"

export default function AdminPage() {
  const [signups, setSignups] = useState<any[]>([])
  const [hotLeads, setHotLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setSignups([
        {
          id: 1,
          name: "John Smith",
          email: "john@email.com",
          phone: "(407) 555-0123",
          address: "123 Main St, Orlando, FL",
          createdAt: "2025-01-09T10:30:00Z",
          status: "new",
          roofAge: "10-15 years",
          issueType: "inspection",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah@email.com",
          phone: "(407) 555-0456",
          address: "456 Oak Ave, Tampa, FL",
          createdAt: "2025-01-09T09:15:00Z",
          status: "contacted",
          roofAge: "5-10 years",
          issueType: "repair",
        },
      ])

      setHotLeads([
        {
          id: 1,
          name: "Mike Wilson",
          phone: "(407) 555-0789",
          address: "789 Pine St, Jacksonville, FL",
          urgency: "emergency",
          services: ["Emergency Leak Repair", "Pro Contact"],
          createdAt: "2025-01-09T11:45:00Z",
          status: "urgent",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const filteredSignups = signups.filter(
    (signup) =>
      signup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.phone.includes(searchTerm),
  )

  const filteredHotLeads = hotLeads.filter(
    (lead) => lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.phone.includes(searchTerm),
  )

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RoofFax Admin Dashboard</h1>
            <p className="text-gray-600">Manage signups, hot leads, and pro connections</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Signups</p>
                    <p className="text-2xl font-bold text-gray-900">{signups.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                    <p className="text-2xl font-bold text-red-600">{hotLeads.length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-green-600">85%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Pros</p>
                    <p className="text-2xl font-bold text-blue-600">47</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="signups" className="space-y-6">
            <TabsList>
              <TabsTrigger value="signups">Regular Signups ({filteredSignups.length})</TabsTrigger>
              <TabsTrigger value="hot-leads">Hot Leads ({filteredHotLeads.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="signups">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Signups</CardTitle>
                  <CardDescription>Homeowners who signed up for pro matching services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSignups.map((signup) => (
                      <div key={signup.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {signup.name}
                              <Badge variant={signup.status === "new" ? "default" : "secondary"} className="text-xs">
                                {signup.status}
                              </Badge>
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                <span>{signup.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <span>{signup.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{signup.address}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(signup.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Match Pros
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Roof Age:</span> {signup.roofAge}
                          </div>
                          <div>
                            <span className="font-medium">Service Needed:</span> {signup.issueType}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hot-leads">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Hot Leads - Priority Response
                  </CardTitle>
                  <CardDescription>Emergency requests requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredHotLeads.map((lead) => (
                      <div key={lead.id} className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {lead.name}
                              <Badge variant="destructive" className="text-xs">
                                {lead.urgency.toUpperCase()}
                              </Badge>
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <span className="font-medium">{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{lead.address}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(lead.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive">
                              <Phone className="h-3 w-3 mr-1" />
                              Call Now
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Dispatch Pro
                            </Button>
                          </div>
                        </div>

                        <div>
                          <span className="font-medium text-sm">Services Requested:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lead.services.map((service: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
