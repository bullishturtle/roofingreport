import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, FileText, Download, ArrowLeft, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import Link from "next/link"

export default function AIReportDemo() {
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
            <h1 className="text-3xl font-bold text-white">AI Property Report Demo</h1>
            <p className="text-gray-400">Generated for: 123 Main Street, Tampa, FL 33601</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Report */}
          <div className="lg:col-span-2 space-y-6">
            {/* Executive Summary */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Executive Summary
                </CardTitle>
                <CardDescription>Generated in 12 seconds using advanced AI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">Overall Assessment:</strong> This single-family home shows signs of
                    moderate roof wear consistent with its age (built 2018). Recent Hurricane Ian damage is evident in
                    the southwest section, with approximately 15% of shingles requiring replacement. The property has
                    good structural integrity but needs immediate attention to prevent water intrusion.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">7.2/10</div>
                    <div className="text-sm text-gray-400">Overall Condition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">High</div>
                    <div className="text-sm text-gray-400">Repair Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">$8,500</div>
                    <div className="text-sm text-gray-400">Est. Repair Cost</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Damage Assessment */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Damage Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Missing Shingles (Southwest Section)</div>
                      <div className="text-sm text-gray-400">
                        Approximately 220 sq ft affected • Hurricane Ian damage
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Granule Loss</div>
                      <div className="text-sm text-gray-400">Normal wear pattern • 15% granule loss detected</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Gutter Damage</div>
                      <div className="text-sm text-gray-400">2 sections need repair • Minor denting observed</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Structural Integrity</div>
                      <div className="text-sm text-gray-400">No structural damage detected • Foundation solid</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-white">Immediate (1-2 weeks)</h4>
                    <ul className="text-sm text-gray-300 space-y-1 mt-2">
                      <li>• Replace missing shingles in southwest section</li>
                      <li>• Install temporary tarping if rain expected</li>
                      <li>• Inspect attic for water damage</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-white">Short-term (1-3 months)</h4>
                    <ul className="text-sm text-gray-300 space-y-1 mt-2">
                      <li>• Repair damaged gutter sections</li>
                      <li>• Clean and inspect all gutters</li>
                      <li>• Apply protective coating to high-wear areas</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-white">Long-term (6-12 months)</h4>
                    <ul className="text-sm text-gray-300 space-y-1 mt-2">
                      <li>• Consider full roof inspection</li>
                      <li>• Plan for roof replacement in 8-10 years</li>
                      <li>• Install impact-resistant shingles when replacing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Report Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Generated:</span>
                    <span className="text-white">Today, 2:34 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Analysis Time:</span>
                    <span className="text-white">12 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Points:</span>
                    <span className="text-white">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-white">94.2%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <h4 className="font-semibold text-white mb-2">AI Models Used</h4>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>• Damage Detection AI v3.2</div>
                    <div>• Weather Impact Analysis</div>
                    <div>• Cost Estimation Engine</div>
                    <div>• Risk Assessment Model</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shingle Replacement:</span>
                  <span className="text-white">$6,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gutter Repair:</span>
                  <span className="text-white">$800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Labor:</span>
                  <span className="text-white">$1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Permits:</span>
                  <span className="text-white">$300</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
                  <span className="text-white">Total Estimate:</span>
                  <span className="text-orange-500">$8,500</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-purple-600/20 to-purple-500/20 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get AI Reports for Any Property</h3>
            <p className="text-gray-300 mb-4">
              Generate detailed AI-powered property reports with damage assessment, cost estimates, and repair
              recommendations.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="https://pro.therooffax.com">Upgrade to Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
