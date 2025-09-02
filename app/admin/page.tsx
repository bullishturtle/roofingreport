"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Users, Search, Phone } from "lucide-react"

export default function AdminDashboard() {
  const [signups, setSignups] = useState([])
  const [hotLeads, setHotLeads] = useState([])
  const [verifications, setVerifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [signupsRes, leadsRes, verificationsRes] = await Promise.all([
        supabase.from("rooffax_signups").select("*").order("created_at", { ascending: false }),
        supabase.from("hot_leads").select("*").order("created_at", { ascending: false }),
        supabase.from("contractor_verifications").select("*").order("created_at", { ascending: false }),
      ])

      setSignups(signupsRes.data || [])
      setHotLeads(leadsRes.data || [])
      setVerifications(verificationsRes.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "LOW":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mr-2">
              <span className="text-black font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">RoofFax Admin Dashboard</h1>
              <p className="text-gray-400">Real-time data from your website</p>
            </div>
          </div>
          <Button onClick={fetchData} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Signups</p>
                  <p className="text-2xl font-bold">{signups.length}</p>
                </div>
                <Users className="text-blue-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hot Leads</p>
                  <p className="text-2xl font-bold">{hotLeads.length}</p>
                </div>
                <AlertTriangle className="text-red-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Urgent Leads</p>
                  <p className="text-2xl font-bold text-red-400">
                    {hotLeads.filter((lead) => lead.priority === "HIGH").length}
                  </p>
                </div>
                <Phone className="text-red-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Verifications</p>
                  <p className="text-2xl font-bold">{verifications.length}</p>
                </div>
                <Search className="text-green-400" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hot-leads" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
            <TabsTrigger value="hot-leads">Hot Leads</TabsTrigger>
            <TabsTrigger value="signups">Signups</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
          </TabsList>

          <TabsContent value="hot-leads" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Hot Leads ({hotLeads.length})</h2>
            {hotLeads.map((lead: any) => (
              <Card key={lead.id} className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{lead.full_name}</h3>
                      <p className="text-gray-400">{lead.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(lead.priority)}>{lead.priority} PRIORITY</Badge>
                      <p className="text-sm text-gray-400 mt-1">{formatDate(lead.created_at)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Contact</p>
                      <p>
                        {lead.phone} • {lead.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Preferred Contact</p>
                      <p>
                        {lead.contact_method} • {lead.best_time}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Damage Status</p>
                      <p>{lead.has_damage ? `Yes (${lead.damage_type?.join(", ")})` : "No visible damage"}</p>
                      {lead.urgency && <p className="text-sm">Urgency: {lead.urgency}</p>}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Insurance</p>
                      <p>{lead.has_insurance || "Not specified"}</p>
                      <p className="text-sm">Previous inspection: {lead.had_inspection ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Interested In</p>
                    <p>{lead.interested_in?.join(", ")}</p>
                  </div>

                  {lead.additional_concerns && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400">Additional Concerns</p>
                      <p className="text-sm bg-gray-800 p-2 rounded">{lead.additional_concerns}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        lead.status === "new"
                          ? "border-yellow-500/30 text-yellow-400"
                          : lead.status === "contacted"
                            ? "border-blue-500/30 text-blue-400"
                            : "border-green-500/30 text-green-400"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-sm text-gray-400">Action: {lead.action}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="signups" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">RoofFax Signups ({signups.length})</h2>
            {signups.map((signup: any) => (
              <Card key={signup.id} className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {signup.first_name} {signup.last_name}
                      </h3>
                      <p className="text-gray-400">{signup.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{signup.report_id}</Badge>
                      <p className="text-sm text-gray-400 mt-1">{formatDate(signup.created_at)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Contact</p>
                      <p>
                        {signup.phone} • {signup.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge
                        variant="outline"
                        className={
                          signup.status === "pending"
                            ? "border-yellow-500/30 text-yellow-400"
                            : signup.status === "processing"
                              ? "border-blue-500/30 text-blue-400"
                              : "border-green-500/30 text-green-400"
                        }
                      >
                        {signup.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="verifications" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Contractor Verifications ({verifications.length})</h2>
            {verifications.map((verification: any) => (
              <Card key={verification.id} className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{verification.contractor_name}</h3>
                      <p className="text-gray-400">Result: {verification.result_data?.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(verification.result_data?.riskLevel)}>
                        {verification.result_data?.riskLevel} RISK
                      </Badge>
                      <p className="text-sm text-gray-400 mt-1">{formatDate(verification.created_at)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Risk Score</p>
                      <p>{verification.result_data?.riskScore}/100</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">User IP</p>
                      <p>{verification.user_ip}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-400">Recommendation</p>
                    <p className="text-sm">{verification.result_data?.recommendation}</p>
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
