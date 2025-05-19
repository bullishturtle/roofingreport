"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CheckCircle, AlertTriangle, AlertCircle, ArrowRight } from "lucide-react"

type Insight = {
  id: string
  metric: string
  issue: string
  impact: "high" | "medium" | "low"
  recommendation: string
  resources: { title: string; url: string }[]
}

export function WebVitalsInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInsights() {
      try {
        setLoading(true)
        const response = await fetch("/api/analytics/web-vitals/insights")

        if (!response.ok) {
          throw new Error("Failed to fetch Web Vitals insights")
        }

        const data = await response.json()
        setInsights(data.insights)
        setError(null)
      } catch (err) {
        setError("Failed to load Web Vitals insights. Please try again later.")
        console.error("Error fetching Web Vitals insights:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  // Helper function to get impact icon
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
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

  if (insights.length === 0) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>No issues detected</AlertTitle>
        <AlertDescription>
          All Core Web Vitals metrics are performing well. Continue monitoring for any changes.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Insights & Recommendations</h2>

      {insights.map((insight) => (
        <Card key={insight.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getImpactIcon(insight.impact)}
                  {insight.metric} Issue
                </CardTitle>
                <CardDescription>
                  Impact: {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Issue</h4>
                <p>{insight.issue}</p>
              </div>

              <div>
                <h4 className="font-semibold">Recommendation</h4>
                <p>{insight.recommendation}</p>
              </div>

              {insight.resources.length > 0 && (
                <div>
                  <h4 className="font-semibold">Resources</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {insight.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {resource.title}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
