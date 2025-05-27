import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ruler, Home, Calculator, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MeasurementsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Aerial Measurements Demo</h1>
            <p className="text-gray-400">Sample property: 123 Main Street, Tampa, FL 33601</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aerial Image */}
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-500" />
                  Satellite View
                </CardTitle>
                <CardDescription>High-resolution aerial imagery with AI measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=600&text=Aerial+View+with+Measurements"
                    alt="Aerial view with measurements"
                    className="w-full rounded-lg"
                  />
                  {/* Measurement overlays */}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">
                    45.2 ft
                  </div>
                  <div className="absolute top-1/2 right-4 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold transform -rotate-90">
                    32.8 ft
                  </div>
                  <div className="absolute bottom-4 left-1/2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold transform -translate-x-1/2">
                    28.5 ft
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">99.2% Accuracy</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Last Updated: Today</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Measurements Data */}
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-orange-500" />
                  Roof Measurements
                </CardTitle>
                <CardDescription>Precise measurements from AI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">1,483 sq ft</div>
                    <div className="text-sm text-gray-400">Total Roof Area</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">45.2 ft</div>
                    <div className="text-sm text-gray-400">Ridge Length</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">32.8 ft</div>
                    <div className="text-sm text-gray-400">Width</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">6/12</div>
                    <div className="text-sm text-gray-400">Roof Pitch</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Detailed Measurements:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Front Section:</span>
                      <span className="text-white">892 sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Back Section:</span>
                      <span className="text-white">591 sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gutters:</span>
                      <span className="text-white">156 linear ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Valleys:</span>
                      <span className="text-white">28 linear ft</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-orange-500" />
                  Material Estimates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shingles (3-tab):</span>
                  <span className="text-white">15 squares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Underlayment:</span>
                  <span className="text-white">1,630 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ridge Cap:</span>
                  <span className="text-white">50 linear ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Starter Strip:</span>
                  <span className="text-white">156 linear ft</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Get Full Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Want measurements for any property?</h3>
            <p className="text-gray-300 mb-4">
              Upgrade to RoofFax Pro for unlimited aerial measurements and detailed reports.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="https://pro.therooffax.com">Upgrade to Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
