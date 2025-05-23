"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthCheckPage() {
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health")
        if (!response.ok) {
          throw new Error(`Health check failed with status: ${response.status}`)
        }
        const data = await response.json()
        setHealth(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        console.error("Health check error:", err)
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">System Health</h1>
        <p>Loading health status...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">System Health</h1>
        <div className="bg-red-100 p-4 rounded text-red-800">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">System Health</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${health.status === "healthy" ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            System Status: {health.status.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Response Time: {health.responseTime}</p>
          <p>Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(health.checks.environment, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(health.checks.memory, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
