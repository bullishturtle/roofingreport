"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Download, ClipboardCopy } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface AuditResult {
  category: string
  status: "pass" | "fail" | "warning"
  message: string
  details?: any
}

interface SiteAuditReport {
  timestamp: string
  overallStatus: "pass" | "fail" | "warning"
  results: AuditResult[]
  summary: {
    passed: number
    failed: number
    warnings: number
    total: number
  }
}

export function SiteAuditRunner() {
  const [loading, setLoading] = useState(false)
  const [auditReport, setAuditReport] = useState<SiteAuditReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/site-audit", {
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
      console.error("Audit error:", err)
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
    a.download = `site-audit-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    if (!auditReport) return
    navigator.clipboard
      .writeText(JSON.stringify(auditReport, null, 2))
      .then(() => alert("Audit report copied to clipboard"))
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Site Audit Tool</CardTitle>
        <CardDescription>Run a comprehensive audit to identify and fix deployment issues</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Audit Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {auditReport && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Audit Results</h3>
                <p className="text-sm text-gray-500">Completed on {new Date(auditReport.timestamp).toLocaleString()}</p>
              </div>
              <Badge className={`${getStatusColor(auditReport.overallStatus)} px-3 py-1`}>
                {auditReport.overallStatus.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-green-50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{auditReport.summary.passed}</p>
                  <p className="text-sm text-green-800">Passed</p>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">{auditReport.summary.failed}</p>
                  <p className="text-sm text-red-800">Failed</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">{auditReport.summary.warnings}</p>
                  <p className="text-sm text-yellow-800">Warnings</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{auditReport.summary.total}</p>
                  <p className="text-sm text-blue-800">Total Checks</p>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {auditReport.results.map((result, index) => (
                <AccordionItem value={index.toString()} key={index}>
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.status)}
                      <span className="font-medium">{result.category}</span>
                      <Badge className={`${getStatusColor(result.status)} ml-2 px-2 py-0.5 text-xs`}>
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <p>{result.message}</p>
                      {result.details && (
                        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={runAudit} disabled={loading} className="flex items-center space-x-2">
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Running Audit...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Run Audit</span>
            </>
          )}
        </Button>

        {auditReport && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} className="flex items-center space-x-2">
              <ClipboardCopy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button variant="outline" onClick={downloadReport} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
