"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

type WebVitalMetric = {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  timestamp: string
  url: string
}

type AggregatedMetric = {
  date: string
  LCP: number
  CLS: number
  FID: number
  TTFB: number
  INP: number
  goodPercent: number
}

type MetricDistribution = {
  name: string
  good: number
  needsImprovement: number
  poor: number
}

export function WebVitalsDashboard() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d")
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([])
  const [aggregatedData, setAggregatedData] = useState<AggregatedMetric[]>([])
  const [distribution, setDistribution] = useState<MetricDistribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWebVitals() {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics/web-vitals?timeRange=${timeRange}`)

        if (!response.ok) {
          throw new Error("Failed to fetch Web Vitals data")
        }

        const data = await response.json()
        setMetrics(data.metrics)
        setAggregatedData(data.aggregated)
        setDistribution(data.distribution)
        setError(null)
      } catch (err) {
        setError("Failed to load Web Vitals data. Please try again later.")
        console.error("Error fetching Web Vitals:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchWebVitals()
  }, [timeRange])

  // Helper function to get color based on rating
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-500"
      case "needs-improvement":
        return "text-amber-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Core Web Vitals Dashboard</h2>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as "24h" | "7d" | "30d")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>LCP</CardTitle>
            <CardDescription>Largest Contentful Paint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aggregatedData.length > 0
                ? `${(aggregatedData[aggregatedData.length - 1].LCP / 1000).toFixed(2)}s`
                : "N/A"}
            </div>
            <p
              className={getRatingColor(
                aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].LCP <= 2500
                  ? "good"
                  : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].LCP <= 4000
                    ? "needs-improvement"
                    : "poor",
              )}
            >
              {aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].LCP <= 2500
                ? "Good"
                : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].LCP <= 4000
                  ? "Needs Improvement"
                  : "Poor"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>CLS</CardTitle>
            <CardDescription>Cumulative Layout Shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aggregatedData.length > 0 ? aggregatedData[aggregatedData.length - 1].CLS.toFixed(3) : "N/A"}
            </div>
            <p
              className={getRatingColor(
                aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].CLS <= 0.1
                  ? "good"
                  : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].CLS <= 0.25
                    ? "needs-improvement"
                    : "poor",
              )}
            >
              {aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].CLS <= 0.1
                ? "Good"
                : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].CLS <= 0.25
                  ? "Needs Improvement"
                  : "Poor"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>FID</CardTitle>
            <CardDescription>First Input Delay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aggregatedData.length > 0 ? `${aggregatedData[aggregatedData.length - 1].FID.toFixed(0)}ms` : "N/A"}
            </div>
            <p
              className={getRatingColor(
                aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].FID <= 100
                  ? "good"
                  : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].FID <= 300
                    ? "needs-improvement"
                    : "poor",
              )}
            >
              {aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].FID <= 100
                ? "Good"
                : aggregatedData.length > 0 && aggregatedData[aggregatedData.length - 1].FID <= 300
                  ? "Needs Improvement"
                  : "Poor"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Web Vitals Trends</CardTitle>
          <CardDescription>Performance metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="LCP"
                  name="LCP (ms)"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line yAxisId="right" type="monotone" dataKey="CLS" name="CLS" stroke="#82ca9d" />
                <Line yAxisId="left" type="monotone" dataKey="FID" name="FID (ms)" stroke="#ffc658" />
                <Line yAxisId="left" type="monotone" dataKey="TTFB" name="TTFB (ms)" stroke="#ff8042" />
                <Line yAxisId="left" type="monotone" dataKey="INP" name="INP (ms)" stroke="#0088fe" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metric Distribution</CardTitle>
          <CardDescription>Distribution of good, needs improvement, and poor ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="good" name="Good" fill="#4ade80" />
                <Bar dataKey="needsImprovement" name="Needs Improvement" fill="#fbbf24" />
                <Bar dataKey="poor" name="Poor" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Performance Score</CardTitle>
          <CardDescription>Percentage of users with good Core Web Vitals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="goodPercent" name="% Good Metrics" stroke="#4ade80" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
