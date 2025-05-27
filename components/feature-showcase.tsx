import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Eye, Brain, Shield } from "lucide-react"

export function FeatureShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">Powered by AI</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The Most Advanced Roof Intelligence Platform
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Combining satellite imagery, AI analysis, and real-time data to give you the complete picture of any
            property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Eye className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Aerial Intelligence</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our AI analyzes high-resolution satellite and aerial imagery to detect roof damage, measure dimensions,
              and identify potential issues that aren't visible from the ground.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">99.2%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">&lt; 30s</div>
                  <div className="text-sm text-gray-400">Analysis Time</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/aerial-analysis-demo.png"
              alt="Aerial Analysis Demo"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>

          {/* Feature 2 */}
          <div className="relative lg:order-last">
            <img
              src="/images/storm-tracking-demo.png"
              alt="Storm Tracking Demo"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>

          <div className="space-y-6 lg:order-last">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Storm Tracking</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Real-time storm tracking with historical weather data helps you understand when damage occurred and build
              stronger insurance claims with precise timeline documentation.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">24/7</div>
                  <div className="text-sm text-gray-400">Monitoring</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">10yr</div>
                  <div className="text-sm text-gray-400">History</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">AI-Generated Reports</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our AI creates comprehensive, professional reports that include damage assessment, repair recommendations,
              and cost estimates - all generated in seconds.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-500">50+</div>
                  <div className="text-sm text-gray-400">Data Points</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-500">PDF</div>
                  <div className="text-sm text-gray-400">Export Ready</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/ai-report-demo.png"
              alt="AI Report Demo"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>

          {/* Feature 4 */}
          <div className="relative lg:order-last">
            <img
              src="/images/contractor-verification-demo.png"
              alt="Contractor Verification Demo"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>

          <div className="space-y-6 lg:order-last">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Contractor Verification</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Protect yourself from door-to-door scams. Instantly verify contractor licenses, insurance, and track
              records with our comprehensive database.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">50k+</div>
                  <div className="text-sm text-gray-400">Contractors</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">Real-time</div>
                  <div className="text-sm text-gray-400">Updates</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
