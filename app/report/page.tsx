"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ErrorBoundary } from "@/components/error-boundary"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { logUserAction, logError } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

export default function ReportPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [reportData, setReportData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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
    alert("Report download started. Your PDF will be ready shortly.")
  }

  const handleEmail = () => {
    logUserAction("Email report clicked", { address })
    alert("Report has been emailed to your registered email address.")
  }

  const handleShare = () => {
    logUserAction("Share report clicked", { address })
    alert("Share link copied to clipboard!")
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
            <Button onClick={() => router.push("/")} className="bg-orange-500 hover:bg-orange-600 text-white">
              Return Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Report Header */}
              <div className="bg-gray-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-2">Roof Report: {reportData.address}</h1>
                <p className="text-sm">Generated on {reportData.reportDate}</p>
              </div>

              {/* Report Actions */}
              <div className="bg-gray-100 p-4 flex flex-wrap gap-2">
                <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                  Download PDF
                </Button>
                <Button onClick={handleEmail} variant="outline">
                  Email Report
                </Button>
                <Button onClick={handleShare} variant="outline">
                  Share Report
                </Button>
              </div>

              {/* Report Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Overview Section */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Roof Overview</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Estimated Age:</div>
                        <div className="text-sm">{reportData.roofAge}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Condition:</div>
                        <div className="text-sm">{reportData.condition}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Est. Lifespan:</div>
                        <div className="text-sm">{reportData.estimatedLifespan}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Materials:</div>
                        <div className="text-sm">{reportData.materials}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Square Footage:</div>
                        <div className="text-sm">{reportData.squareFootage}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Slope:</div>
                        <div className="text-sm">{reportData.slope}</div>
                      </div>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Roof Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {reportData.images.map((image: string, index: number) => (
                        <div key={index} className="border rounded overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Roof image ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Issues Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Identified Issues</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {reportData.issues.map((issue: string, index: number) => (
                      <li key={index} className="text-sm">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Recommendations</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {reportData.recommendations.map((recommendation: string, index: number) => (
                      <li key={index} className="text-sm">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <h2 className="text-xl font-bold mb-2">Need Professional Help?</h2>
                  <p className="text-sm mb-4">
                    Connect with trusted roofing professionals in your area who can help address these issues.
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600">Find Roofing Pros</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
