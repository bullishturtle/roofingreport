"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { logUserAction, logError } from "@/lib/utils"
import { AlertTriangle, Download, Mail, Share2 } from "lucide-react"
import { sendReportEmail } from "@/actions/report-actions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ReportPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [reportData, setReportData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const address = searchParams.get("address")

  useEffect(() => {
    if (!address) {
      setError("No address provided")
      setIsLoading(false)
      return
    }

    async function fetchReportData() {
      try {
        logUserAction("Fetching report data", { address })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock report data
        const mockReportData = {
          address,
          reportDate: new Date().toLocaleDateString(),
          roofAge: "8-10 years",
          condition: "Good",
          estimatedLifespan: "15-20 years",
          materials: "Asphalt Shingles",
          squareFootage: "2,400 sq ft",
          slope: "6:12",
          issues: [
            "Minor granule loss in some areas",
            "Two damaged shingles on south side",
            "Flashing around chimney needs inspection",
          ],
          recommendations: [
            "Schedule professional inspection within 6 months",
            "Monitor south side for further damage",
            "Consider gutter cleaning and maintenance",
          ],
          images: ["/roof-aerial-view.png", "/roof-closeup.png", "/damaged-roof.png"],
        }

        setReportData(mockReportData)
        logUserAction("Report data loaded", { address })
      } catch (error) {
        const err = error as Error
        logError(err, "Fetching report data")
        setError("Failed to load report data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [address])

  const handleDownload = () => {
    logUserAction("Download report clicked", { address })
    toast({
      title: "Download Started",
      description: "Your PDF will be ready shortly.",
      duration: 3000,
    })
  }

  const handleEmailDialogOpen = () => {
    // Pre-fill with user data if available
    if (user) {
      setRecipientEmail(user.email || "")
      setRecipientName(user.name || "")
    }
    setEmailDialogOpen(true)
  }

  const handleSendEmail = async () => {
    if (!recipientEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsSendingEmail(true)

    try {
      // Create a mock report ID for demonstration purposes
      const mockReportId = `report-${Date.now()}`

      const result = await sendReportEmail(
        mockReportId,
        recipientEmail,
        recipientName || "Property Owner",
        "Here is your requested roof report.",
      )

      if (result.success) {
        toast({
          title: "Email Sent",
          description: "The report has been sent to the provided email address.",
          duration: 3000,
        })
        setEmailDialogOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send email. Please try again.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleShare = () => {
    logUserAction("Share report clicked", { address })

    // Create a shareable URL
    const shareUrl = `${window.location.origin}/report?address=${encodeURIComponent(address || "")}`

    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `RoofFax Report for ${address}`,
          text: "Check out this roof report from RoofFax",
          url: shareUrl,
        })
        .catch(() => {
          // Fallback if share fails
          copyToClipboard(shareUrl)
        })
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Report link copied to clipboard!",
          duration: 3000,
        })
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Failed to copy link. Please try again.",
          variant: "destructive",
          duration: 3000,
        })
      })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Generating your roof report...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Return Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Report Header */}
            <div className="bg-blue-900 text-white p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">RoofFax Report</h1>
              <p className="text-lg md:text-xl">{reportData.address}</p>
              <p className="text-sm opacity-80">Generated on {reportData.reportDate}</p>
            </div>

            {/* Report Content */}
            <div className="p-6">
              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">Roof Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Estimated Age:</dt>
                        <dd>{reportData.roofAge}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Condition:</dt>
                        <dd>{reportData.condition}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Est. Remaining Life:</dt>
                        <dd>{reportData.estimatedLifespan}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Materials:</dt>
                        <dd>{reportData.materials}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Square Footage:</dt>
                        <dd>{reportData.squareFootage}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Slope:</dt>
                        <dd>{reportData.slope}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Issues Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">Identified Issues</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {reportData.issues.map((issue: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">Recommendations</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {reportData.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Images Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">Roof Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reportData.images.map((image: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Roof image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-8">
                <Button onClick={handleDownload} className="bg-blue-900 hover:bg-blue-800 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={handleEmailDialogOpen} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Report
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 text-xs text-gray-500 border-t pt-4">
                <p>
                  This report is generated based on available data and satellite imagery. For a comprehensive
                  professional inspection, please consult with a certified roofing contractor.
                </p>
                <p className="mt-1">© {new Date().getFullYear()} RoofFax.Report. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Report</DialogTitle>
            <DialogDescription>Send this roof report to yourself or someone else via email.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Recipient's name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEmailDialogOpen(false)} disabled={isSendingEmail}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSendingEmail ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Sending...
                </>
              ) : (
                "Send Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
