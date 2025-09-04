"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, AlertTriangle, FileText, TrendingUp, Phone, Mail, MapPin, Calendar, RefreshCw } from "lucide-react"

interface Signup {
  id: number
  first_name: string
  last_name: string
  email: string
  address: string
  report_id: string
  status: string
  created_at: string
}

interface HotLead {
  id: number
  full_name: string
  phone: string
  email: string
  address: string
  urgency: string
  priority: string
  interested_in: string[]
  damage_description: string
  insurance_claim: boolean
  contractor_contact: boolean
  lead_id: string
  status: string
  created_at: string
}

interface Stats {
  totalSignups: number
  totalHotLeads: number
  highPriorityLeads: number
  todaySignups: number
  todayLeads: number
}

export default function AdminPage() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [hotLeads, setHotLeads] = useState<HotLead[]>([])
  const [stats, setStats] = useState<Stats>({
    totalSignups: 0,
    totalHotLeads: 0,
    highPriorityLeads: 0,
    todaySignups: 0,
    todayLeads: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch signups
      const signupsResponse = await fetch("/api/admin/signups")
      if (!signupsResponse.ok) throw new Error("Failed to fetch signups")
      const signupsData = await signupsResponse.json()
      setSignups(signupsData.signups || [])

      // Fetch hot leads
      const leadsResponse = await fetch("/api/admin/hot-leads")
      if (!leadsResponse.ok) throw new Error("Failed to fetch hot leads")
      const leadsData = await leadsResponse.json()
      setHotLeads(leadsData.hotLeads || [])

      // Calculate stats
      const today = new Date().toISOString().split("T")[0]
      const todaySignups = signupsData.signups?.filter((s: Signup) => s.created_at.startsWith(today)).length || 0
      const todayLeads = leadsData.hotLeads?.filter((l: HotLead) => l.created_at.startsWith(today)).length || 0
      const highPriorityLeads = leadsData.hotLeads?.filter((l: HotLead) => l.priority === "HIGH").length || 0

      setStats({
        totalSignups: signupsData.signups?.length || 0,
        totalHotLeads: leadsData.hotLeads?.length || 0,
        highPriorityLeads,
        todaySignups,
        todayLeads,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
            🚨 HIGH
          </Badge>
        )
      case "MEDIUM":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">⚡ MEDIUM</Badge>
      case "LOW":
        return (
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            📊 LOW
          </Badge>
        )
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax Admin
              </span>
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert className="mb-6 border-red-500 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Total Signups</p>
                  <p className="text-2xl font-bold text-white">{stats.totalSignups}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Hot Leads</p>
                  <p className="text-2xl font-bold text-white">{stats.totalHotLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-red-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">High Priority</p>
                  <p className="text-2xl font-bold text-white">{stats.highPriorityLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Today Signups</p>
                  <p className="text-2xl font-bold text-white">{stats.todaySignups}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-orange-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-400">Today Leads</p>
                  <p className="text-2xl font-bold text-white">{stats.todayLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hot Leads */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Hot Leads ({hotLeads.length})
              </CardTitle>
              <CardDescription className="text-slate-400">Priority leads requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {hotLeads.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">No hot leads yet</p>
                ) : (
                  hotLeads.map((lead) => (
                    <div key={lead.id} className="border border-slate-600 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{lead.full_name}</h4>
                        {getPriorityBadge(lead.priority)}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-sm">
                        <div className="flex items-center text-slate-300">
                          <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                          <a href={`tel:${lead.phone}`} className="hover:text-yellow-400">
                            {lead.phone}
                          </a>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                          <a href={`mailto:${lead.email}`} className="hover:text-yellow-400">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>{lead.address}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>{formatDate(lead.created_at)}</span>
                        </div>
                      </div>
                      {lead.damage_description && (
                        <div className="text-sm text-slate-400 bg-slate-700/50 p-2 rounded">
                          <strong>Damage:</strong> {lead.damage_description}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {lead.interested_in.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">
                        ID: {lead.lead_id} | Urgency: {lead.urgency}
                        {lead.insurance_claim && " | Insurance Claim"}
                        {lead.contractor_contact && " | Contractor Contact"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Signups */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Recent Signups ({signups.length})
              </CardTitle>
              <CardDescription className="text-slate-400">New roof report requests</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {signups.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">No signups yet</p>
                ) : (
                  signups.map((signup) => (
                    <div key={signup.id} className="border border-slate-600 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                          {signup.first_name} {signup.last_name}
                        </h4>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {signup.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-sm">
                        <div className="flex items-center text-slate-300">
                          <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                          <a href={`mailto:${signup.email}`} className="hover:text-yellow-400">
                            {signup.email}
                          </a>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>{signup.address}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>{formatDate(signup.created_at)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">Report ID: {signup.report_id}</div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p>Powered by RoofFax™ | All rights reserved © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
