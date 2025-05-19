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

  const address = searchParams.get('address')

  useEffect(() => {
    if (!address) {
      setError('No address provided')
      setIsLoading(false)
      return
    }

    async function fetchReportData() {
      try {
        logUserAction('Fetching report data', { address })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock report data
        const mockReportData = {
          address,
          reportDate: new Date().toLocaleDateString(),
          roofAge: '8-10 years',
          condition: 'Good',
          estimatedLifespan: '15-20 years',
          materials: 'Asphalt Shingles',
          squareFootage: '2,400 sq ft',
          slope: '6:12',
          issues: [
            'Minor granule loss in some areas',
            'Two damaged shingles on south side',
            'Flashing around chimney needs inspection'
          ],
          recommendations: [
            'Schedule professional inspection within 6 months',
            'Monitor south side for further damage',
            'Consider gutter cleaning and maintenance'
          ],
          images: [
            '/placeholder.svg?key=o5c2g',
            '/placeholder.svg?key=922cw',
            '/placeholder.svg?key=yqlg1'
          ]
        }
        
        setReportData(mockReportData)
        logUserAction('Report data loaded', { address })
      } catch (error) {
        const err = error as Error
        logError(err, 'Fetching report data')
        setError('Failed to load report data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [address])

  const handleDownload = () => {
    logUserAction('Download report clicked', { address })
    alert('Report download started. Your PDF will be ready shortly.')
  }

  const handleEmail = () => {
    logUserAction('Email report clicked', { address })
    alert('Report has been emailed to your registered email address.')
  }

  const handleShare = () => {
    logUserAction('Share report clicked', { address })
    alert('Share link copied to clipboard!')
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
            <Button 
              onClick={() => router.push('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
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
              <div className="bg-navy-800 text-white p-6">
\
