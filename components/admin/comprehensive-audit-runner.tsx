"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Download, ClipboardCopy, TrendingUp } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import type { SiteAuditReport, AuditResult } from "@/lib/comprehensive-site-audit"

export function ComprehensiveAuditRunner() {
  const [loading, setLoading] = useState(false)
  const [auditReport, setAuditReport] = useState<SiteAuditReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/comprehensive-audit", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Audit failed with status: ${response.status}`)
      }

      const data = await response.json()
      setAuditReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Comprehensive audit error:", err)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    if (!auditReport) return

    const blob = new Blob([JSON.stringify(auditReport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `comprehensive-audit-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    if (!auditReport) return
    navigator.clipboard
      .writeText(JSON.stringify(auditReport, null, 2))
      .then(() => alert("Comprehensive audit report copied to clipboard"))
      .catch((err) => console.error("Failed to copy:", err))
  }

  const getStatusIcon = (status: "pass" | "fail" | "warning") => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: "pass" | "fail" | "warning") => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "fail":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    }
  }

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
    }
  }

  const getScorePercentage = () => {
    if (!auditReport) return 0
    return Math.round((auditReport.summary.passed / auditReport.summary.total) * 100)
  }

  const groupResultsByCategory = (results: AuditResult[]) => {
    return results.reduce(
      (acc, result) => {
        if (!acc[result.category]) {
          acc[result.category] = []
        }
        acc[result.category].push(result)
        return acc
      },
      {} as Record<string, AuditResult[]>,
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          Comprehensive Site Audit
        </CardTitle>
        <CardDescription>
          Complete analysis of user experience, accessibility, performance, and code quality
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Audit Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {auditReport && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">{getScorePercentage()}%</div>
              <div className="text-lg font-medium text-gray-700 mb-4">Overall Site Health Score</div>
              <Progress value={getScorePercentage()} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-gray-600 mt-2">
                Completed on {new Date(auditReport.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Card className="bg-green-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{auditReport.summary.passed}</p>
                  <p className="text-xs text-green-800">Passed</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{auditReport.summary.failed}</p>
                  <p className="text-xs text-red-800">Failed</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">{auditReport.summary.warnings}</p>
                  <p className="text-xs text-yellow-800">Warnings</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{auditReport.summary.total}</p>
                  <p className="text-xs text-blue-800">Total</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{auditReport.summary.highPriority}</p>
                  <p className="text-xs text-red-800">High Priority</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">{auditReport.summary.mediumPriority}</p>
                  <p className="text-xs text-yellow-800">Medium Priority</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{auditReport.summary.lowPriority}</p>
                  <p className="text-xs text-blue-800">Low Priority</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Results by Category */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Detailed Results by Category</h3>
              <Accordion type="multiple" className="w-full">
                {Object.entries(groupResultsByCategory(auditReport.results)).map(([category, results]) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{category}</span>
                        <div className="flex space-x-1">
                          {results.map((result, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              {getStatusIcon(result.status)}
                              <Badge className={`${getPriorityColor(result.priority)} text-xs px-1 py-0`}>
                                {result.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {results.map((result, index) => (
                          <div key={index} className="border-l-4 border-gray-200 pl-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(result.status)}
                                <span className="font-medium">{result.message}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Badge className={`${getStatusColor(result.status)} text-xs`}>
                                  {result.status.toUpperCase()}
                                </Badge>
                                <Badge className={`${getPriorityColor(result.priority)} text-xs`}>
                                  {result.priority.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            {result.details && (
                              <div className="bg-gray-50 p-3 rounded text-sm">
                                <pre className="whitespace-pre-wrap overflow-x-auto">
                                  {JSON.stringify(result.details, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={runAudit} disabled={loading} className="flex items-center space-x-2">
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Running Comprehensive Audit...</span>
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4" />
              <span>Run Comprehensive Audit</span>
            </>
          )}
        </Button>

        {auditReport && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} className="flex items-center space-x-2">
              <ClipboardCopy className="h-4 w-4" />
              <span>Copy Report</span>
            </Button>
            <Button variant="outline" onClick={downloadReport} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
