import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Eye, Zap } from "lucide-react"
import Link from "next/link"

export default function DamageAssessmentDemo() {
  const damageAreas = [
    { id: 1, severity: "high", type: "Missing Shingles", area: "Southwest Section", confidence: 94 },
    { id: 2, severity: "medium", type: "Granule Loss", area: "North Face", confidence: 87 },
    { id: 3, severity: "low", type: "Minor Wear", area: "East Edge", confidence: 76 },
  ]

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
            <h1 className="text-3xl font-bold text-white">AI Damage Assessment Demo</h1>
            <p className="text-gray-400">Automated damage detection for: 123 Main Street, Tampa, FL 33601</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aerial Analysis */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="h-5 w-5 text-orange-500" />
                  AI Damage Detection
                </CardTitle>
                <CardDescription>High-resolution aerial analysis with AI-powered damage identification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=600&text=Aerial+Damage+Analysis"
                    alt="Aerial damage analysis"
                    className="w-full rounded-lg"
                  />
                  {/* Damage markers */}
                  <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Eye className="h-3 w-3 mr-1" />
                    AI Analyzed
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Zap className="h-3 w-3 mr-1" />
                    Real-time Detection
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">3</div>
                    <div className="text-sm text-gray-400">Damage Areas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">15%</div>
                    <div className="text-sm text-gray-400">Roof Affected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">89%</div>
                    <div className="text-sm text-gray-400">AI Confidence</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Analysis Time:</span>
                    <span className="text-white">8.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Image Resolution:</span>
                    <span className="text-white">4K Ultra HD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">Today, 3:42 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Damage Details */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Detected Damage</CardTitle>
                <CardDescription>AI-identified issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {damageAreas.map((damage) => (
                  <div
                    key={damage.id}
                    className={`p-4 rounded-lg border ${
                      damage.severity === "high"
                        ? "bg-red-500/10 border-red-500/30"
                        : damage.severity === "medium"
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-orange-500/10 border-orange-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            damage.severity === "high"
                              ? "bg-red-500"
                              : damage.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                          }`}
                        >
                          {damage.id}
                        </div>
                        <h4 className="font-semibold text-white">{damage.type}</h4>
                      </div>
                      <Badge
                        className={`${
                          damage.severity === "high"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : damage.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }`}
                      >
                        {damage.severity === "high"
                          ? "High Priority"
                          : damage.severity === "medium"
                            ? "Medium Priority"
                            : "Low Priority"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Location:</span>
                        <div className="text-white">{damage.area}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">AI Confidence:</span>
                        <div className="text-white">{damage.confidence}%</div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-300">
                      {damage.severity === "high" && "Immediate repair recommended to prevent water damage"}
                      {damage.severity === "medium" && "Monitor closely and plan repairs within 3-6 months"}
                      {damage.severity === "low" && "Normal wear, address during next maintenance cycle"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Repair Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Immediate Action Required</div>
                    <div className="text-sm text-gray-300">
                      Replace missing shingles in southwest section to prevent water intrusion
                    </div>
                    <div className="text-sm text-red-400 mt-1">Est. Cost: $2,500 - $3,500</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Monitor & Plan</div>
                    <div className="text-sm text-gray-300">
                      Schedule granule loss assessment and potential shingle replacement
                    </div>
                    <div className="text-sm text-yellow-400 mt-1">Est. Cost: $1,200 - $2,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Routine Maintenance</div>
                    <div className="text-sm text-gray-300">Include in next scheduled maintenance cycle</div>
                    <div className="text-sm text-green-400 mt-1">Est. Cost: $300 - $500</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Download Assessment</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Schedule Inspection
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get AI Damage Assessment for Any Property</h3>
            <p className="text-gray-300 mb-4">
              Instantly detect roof damage with our advanced AI technology. Get detailed reports with repair
              recommendations and cost estimates.
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
