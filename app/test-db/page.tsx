"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Database, RefreshCw } from "lucide-react"
import Link from "next/link"

interface TestResult {
  name: string
  status: "success" | "error" | "warning"
  message: string
  details?: string
}

export default function TestDbPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    setResults([])

    const tests: TestResult[] = []

    // Test 1: Database Connection
    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      if (data.success) {
        tests.push({
          name: "Database Connection",
          status: "success",
          message: "Successfully connected to Supabase",
          details: `Connected to: ${data.database}`,
        })
      } else {
        tests.push({
          name: "Database Connection",
          status: "error",
          message: "Failed to connect to database",
          details: data.error,
        })
      }
    } catch (error) {
      tests.push({
        name: "Database Connection",
        status: "error",
        message: "Connection test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 2: Tables Existence
    try {
      const response = await fetch("/api/test-tables")
      const data = await response.json()

      if (data.success) {
        tests.push({
          name: "Database Tables",
          status: "success",
          message: "All required tables exist",
          details: `Tables: ${data.tables.join(", ")}`,
        })
      } else {
        tests.push({
          name: "Database Tables",
          status: "error",
          message: "Missing required tables",
          details: data.error,
        })
      }
    } catch (error) {
      tests.push({
        name: "Database Tables",
        status: "error",
        message: "Table check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 3: Insert Test Data
    try {
      const testData = {
        firstName: "Test",
        lastName: "User",
        email: `test-${Date.now()}@example.com`,
        address: "123 Test Street, Test City, FL 32501",
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const data = await response.json()

      if (data.success) {
        tests.push({
          name: "Data Insert Test",
          status: "success",
          message: "Successfully inserted test data",
          details: `Report ID: ${data.reportId}`,
        })
      } else {
        tests.push({
          name: "Data Insert Test",
          status: "error",
          message: "Failed to insert test data",
          details: data.error,
        })
      }
    } catch (error) {
      tests.push({
        name: "Data Insert Test",
        status: "error",
        message: "Insert test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 4: Environment Variables
    const envVars = [
      "SUPABASE_SUPABASE_URL",
      "SUPABASE_SUPABASE_SERVICE_ROLE_KEY",
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ]

    const missingVars = envVars.filter((varName) => !process.env[varName])

    if (missingVars.length === 0) {
      tests.push({
        name: "Environment Variables",
        status: "success",
        message: "All required environment variables are set",
        details: `Checked: ${envVars.join(", ")}`,
      })
    } else {
      tests.push({
        name: "Environment Variables",
        status: "warning",
        message: "Some environment variables may be missing",
        details: `Note: Client-side check cannot verify server-side variables`,
      })
    }

    setResults(tests)
    setIsLoading(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-500 bg-green-500/10"
      case "error":
        return "border-red-500 bg-red-500/10"
      case "warning":
        return "border-yellow-500 bg-yellow-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  const allTestsPassed = results.length > 0 && results.every((r) => r.status === "success")
  const hasErrors = results.some((r) => r.status === "error")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax Database Test
              </span>
            </Link>
            <Button
              onClick={runTests}
              disabled={isLoading}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Testing..." : "Run Tests"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Database Connection Test</h1>
            <p className="text-lg text-slate-300">
              Verify that all database connections and configurations are working properly
            </p>
          </div>

          {/* Overall Status */}
          {results.length > 0 && (
            <Alert
              className={`mb-8 ${allTestsPassed ? "border-green-500 bg-green-500/10" : hasErrors ? "border-red-500 bg-red-500/10" : "border-yellow-500 bg-yellow-500/10"}`}
            >
              {allTestsPassed ? (
                <CheckCircle className="h-4 w-4" />
              ) : hasErrors ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription
                className={allTestsPassed ? "text-green-300" : hasErrors ? "text-red-300" : "text-yellow-300"}
              >
                {allTestsPassed
                  ? "✅ All tests passed! Your database is properly configured and ready to use."
                  : hasErrors
                    ? "❌ Some tests failed. Please check the configuration and try again."
                    : "⚠️ Tests completed with warnings. Review the results below."}
              </AlertDescription>
            </Alert>
          )}

          {/* Test Results */}
          <div className="space-y-6">
            {results.map((result, index) => (
              <Card key={index} className={`bg-slate-800/50 border-2 ${getStatusColor(result.status)}`}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {getStatusIcon(result.status)}
                    <span className="ml-2">{result.name}</span>
                  </CardTitle>
                  <CardDescription className="text-slate-400">{result.message}</CardDescription>
                </CardHeader>
                {result.details && (
                  <CardContent>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <p className="text-sm text-slate-300 font-mono">{result.details}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
              <p className="text-white text-lg">Running database tests...</p>
              <p className="text-slate-400">This may take a few moments</p>
            </div>
          )}

          {/* Instructions */}
          <Card className="bg-slate-800/30 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-slate-300">
                {allTestsPassed ? (
                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold">🎉 Great! Your database is ready to go.</p>
                    <ul className="space-y-1 text-sm">
                      <li>• All forms will now save data to Supabase</li>
                      <li>• Admin dashboard will display real-time data</li>
                      <li>• Email notifications are configured</li>
                      <li>• You can now deploy your site</li>
                    </ul>
                  </div>
                ) : hasErrors ? (
                  <div className="space-y-2">
                    <p className="text-red-400 font-semibold">❌ Please fix the following issues:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Check your Supabase environment variables</li>
                      <li>• Ensure the database setup script has been run</li>
                      <li>• Verify your Supabase project is active</li>
                      <li>• Check the API routes are working</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-yellow-400 font-semibold">⚠️ Review the warnings above.</p>
                    <p className="text-sm">Most functionality should work, but some features may be limited.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">View Admin Dashboard</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
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
