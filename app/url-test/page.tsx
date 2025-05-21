"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from "lucide-react"

// Fix URL formatting function
const fixUrl = (url: string) => {
  // Ensure protocol has double slashes
  let fixedUrl = url.replace("https:/", "https://")
  // Fix double slashes in the path (but not in the protocol)
  fixedUrl = fixedUrl.replace("//roofus-models//", "/roofus-models/")
  return fixedUrl
}

// All Supabase URLs to test
const URLS = {
  // Models
  CHARACTER: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/character.glb"),
  IDLE: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/idle.glb"),
  WALK: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/walk.glb"),
  RUN: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/run.glb"),
  JUMP: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/jump.glb"),
  CLIMB: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/climb.glb"),
  DEATH: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/death.glb"),
  SOMERSAULT: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/soumersault.glb"),

  // Textures
  BASE_COLOR: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/Image_0.jpg"),
  ROUGHNESS: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/Image_1.jpg"),
  NORMAL_MAP: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/Image_2.jpg"),

  // Environment
  HDR: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/color_121212.hdr"),
}

// URL test result type
type TestResult = {
  url: string
  name: string
  status: "pending" | "loading" | "success" | "error"
  statusCode?: number
  contentType?: string
  contentLength?: string
  error?: string
  duration?: number
}

export default function UrlTestPage() {
  const [results, setResults] = useState<Record<string, TestResult>>(() => {
    const initial: Record<string, TestResult> = {}
    Object.entries(URLS).forEach(([name, url]) => {
      initial[name] = {
        url,
        name,
        status: "pending",
      }
    })
    return initial
  })

  const [testing, setTesting] = useState(false)
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [overallStatus, setOverallStatus] = useState<"pending" | "success" | "error" | "partial">("pending")

  // Test a single URL
  const testUrl = async (name: string, url: string) => {
    setResults((prev) => ({
      ...prev,
      [name]: { ...prev[name], status: "loading" },
    }))

    const startTime = performance.now()

    try {
      const response = await fetch(url, { method: "HEAD" })
      const endTime = performance.now()
      const duration = endTime - startTime

      if (response.ok) {
        setResults((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            status: "success",
            statusCode: response.status,
            contentType: response.headers.get("content-type") || undefined,
            contentLength: response.headers.get("content-length") || undefined,
            duration,
          },
        }))
      } else {
        setResults((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            status: "error",
            statusCode: response.status,
            error: `HTTP Error: ${response.status} ${response.statusText}`,
            duration,
          },
        }))
      }
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime

      setResults((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
          duration,
        },
      }))
    }
  }

  // Test all URLs
  const testAllUrls = async () => {
    setTesting(true)

    for (const [name, url] of Object.entries(URLS)) {
      await testUrl(name, url)
      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setTesting(false)
    updateOverallStatus()
  }

  // Update overall status
  const updateOverallStatus = () => {
    const statuses = Object.values(results).map((result) => result.status)

    if (statuses.every((status) => status === "success")) {
      setOverallStatus("success")
    } else if (statuses.every((status) => status === "pending")) {
      setOverallStatus("pending")
    } else if (statuses.some((status) => status === "success") && statuses.some((status) => status === "error")) {
      setOverallStatus("partial")
    } else {
      setOverallStatus("error")
    }
  }

  // Update overall status when results change
  useEffect(() => {
    updateOverallStatus()
  }, [results])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Supabase URL Accessibility Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Status</span>
            <Badge
              className={`ml-2 ${
                overallStatus === "success"
                  ? "bg-green-500"
                  : overallStatus === "partial"
                    ? "bg-yellow-500"
                    : overallStatus === "error"
                      ? "bg-red-500"
                      : "bg-gray-500"
              }`}
            >
              {overallStatus === "success"
                ? "All URLs Accessible"
                : overallStatus === "partial"
                  ? "Some URLs Accessible"
                  : overallStatus === "error"
                    ? "URL Access Issues"
                    : "Not Tested"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Testing accessibility of {Object.keys(URLS).length} Supabase URLs for Roofus models and assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total URLs</div>
                <div className="text-2xl font-bold">{Object.keys(URLS).length}</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Accessible</div>
                <div className="text-2xl font-bold">
                  {Object.values(results).filter((r) => r.status === "success").length}
                </div>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Inaccessible</div>
                <div className="text-2xl font-bold">
                  {Object.values(results).filter((r) => r.status === "error").length}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Not Tested</div>
                <div className="text-2xl font-bold">
                  {Object.values(results).filter((r) => r.status === "pending").length}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={testAllUrls} disabled={testing} className="w-full max-w-xs" size="lg">
                {testing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Testing URLs...
                  </>
                ) : (
                  "Test All URLs"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>URL Test Results</CardTitle>
          <CardDescription>Detailed results for each Supabase URL</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Content Type</TableHead>
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(results).map(([name, result]) => (
                <TableRow key={name} className={selectedTest === name ? "bg-gray-100 dark:bg-gray-800" : ""}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {result.status === "pending" && <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />}
                      {result.status === "loading" && (
                        <RefreshCw className="h-4 w-4 animate-spin text-yellow-500 mr-2" />
                      )}
                      {result.status === "success" && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                      {result.status === "error" && <XCircle className="h-4 w-4 text-red-500 mr-2" />}

                      {result.status === "pending" && "Not Tested"}
                      {result.status === "loading" && "Testing..."}
                      {result.status === "success" && (
                        <span className="flex items-center">
                          {result.statusCode}
                          <Badge className="ml-2 bg-green-500">OK</Badge>
                        </span>
                      )}
                      {result.status === "error" && (
                        <span className="flex items-center">
                          {result.statusCode || "Error"}
                          <Badge className="ml-2 bg-red-500">Failed</Badge>
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {result.contentType || (result.status === "success" ? "Unknown" : "-")}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {result.contentLength
                      ? `${(Number.parseInt(result.contentLength) / 1024).toFixed(2)} KB`
                      : result.status === "success"
                        ? "Unknown"
                        : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testUrl(name, result.url)}
                        disabled={result.status === "loading"}
                      >
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTest(selectedTest === name ? null : name)}
                      >
                        Details
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedTest && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>URL Details: {selectedTest}</CardTitle>
            <CardDescription className="break-all">{results[selectedTest].url}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Status</h3>
                <div className="flex items-center mt-1">
                  {results[selectedTest].status === "pending" && <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />}
                  {results[selectedTest].status === "loading" && (
                    <RefreshCw className="h-5 w-5 animate-spin text-yellow-500 mr-2" />
                  )}
                  {results[selectedTest].status === "success" && (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {results[selectedTest].status === "error" && <XCircle className="h-5 w-5 text-red-500 mr-2" />}

                  {results[selectedTest].status === "pending" && "Not Tested"}
                  {results[selectedTest].status === "loading" && "Testing..."}
                  {results[selectedTest].status === "success" && (
                    <span>
                      HTTP {results[selectedTest].statusCode} - Accessible
                      {results[selectedTest].duration && (
                        <span className="text-gray-500 ml-2">({results[selectedTest].duration.toFixed(0)}ms)</span>
                      )}
                    </span>
                  )}
                  {results[selectedTest].status === "error" && (
                    <span>
                      {results[selectedTest].statusCode
                        ? `HTTP ${results[selectedTest].statusCode} - Not Accessible`
                        : "Connection Error - Not Accessible"}
                      {results[selectedTest].duration && (
                        <span className="text-gray-500 ml-2">({results[selectedTest].duration.toFixed(0)}ms)</span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {results[selectedTest].status === "success" && (
                <div>
                  <h3 className="text-lg font-medium">Response Headers</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Content-Type:</div>
                      <div className="text-sm">{results[selectedTest].contentType || "Not provided"}</div>

                      <div className="text-sm font-medium">Content-Length:</div>
                      <div className="text-sm">
                        {results[selectedTest].contentLength
                          ? `${results[selectedTest].contentLength} bytes (${(
                              Number.parseInt(results[selectedTest].contentLength) / 1024
                            ).toFixed(2)} KB)`
                          : "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {results[selectedTest].status === "error" && results[selectedTest].error && (
                <Alert variant="destructive">
                  <AlertTitle>Error Details</AlertTitle>
                  <AlertDescription>{results[selectedTest].error}</AlertDescription>
                </Alert>
              )}

              <div>
                <h3 className="text-lg font-medium">Actions</h3>
                <div className="flex space-x-2 mt-1">
                  <Button onClick={() => testUrl(selectedTest, results[selectedTest].url)}>Test Again</Button>
                  <Button variant="outline" asChild>
                    <a href={results[selectedTest].url} target="_blank" rel="noopener noreferrer">
                      Open URL
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
