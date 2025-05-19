"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getAllTemplates, validateTemplates } from "@/lib/email-template-tester"

export function EmailTemplatePreview() {
  const [activeTab, setActiveTab] = useState("report")
  const [testEmail, setTestEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<null | { success: boolean; message: string }>(null)

  const templates = getAllTemplates()
  const validationResults = validateTemplates()

  const handleSendTest = async () => {
    if (!testEmail) {
      setSendResult({ success: false, message: "Please enter a valid email address" })
      return
    }

    setIsSending(true)
    setSendResult(null)

    try {
      const response = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          templateType: activeTab,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSendResult({ success: true, message: `Test email sent to ${testEmail}` })
      } else {
        setSendResult({ success: false, message: data.error || "Failed to send test email" })
      }
    } catch (error) {
      setSendResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Template Preview</CardTitle>
        <CardDescription>Preview and test email templates to ensure they render correctly</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="passwordReset">Password Reset</TabsTrigger>
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
          </TabsList>

          {Object.entries(templates).map(([key, html]) => (
            <TabsContent key={key} value={key} className="mt-0">
              {!validationResults[key as keyof typeof validationResults].valid && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Template Issues Detected</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2">
                      {validationResults[key as keyof typeof validationResults].issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="border rounded-md p-4 mb-4 overflow-auto max-h-[500px]">
                <iframe
                  srcDoc={html}
                  title={`${key} email template preview`}
                  className="w-full h-[500px] border-0"
                  sandbox="allow-same-origin"
                />
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="test-email">Send Test Email</Label>
                  <Input
                    id="test-email"
                    type="email"
                    placeholder="Enter your email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendTest} disabled={isSending || !testEmail}>
                  {isSending ? <LoadingSpinner className="mr-2 h-4 w-4" /> : null}
                  {isSending ? "Sending..." : "Send Test"}
                </Button>
              </div>

              {sendResult && (
                <Alert variant={sendResult.success ? "default" : "destructive"} className="mt-4">
                  <AlertTitle>{sendResult.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{sendResult.message}</AlertDescription>
                </Alert>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.print()}>
          Print Preview
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const blob = new Blob([templates[activeTab as keyof typeof templates]], { type: "text/html" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${activeTab}-template.html`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }}
        >
          Download HTML
        </Button>
      </CardFooter>
    </Card>
  )
}
