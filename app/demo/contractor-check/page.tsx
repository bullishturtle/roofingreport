import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Search, ArrowLeft, CheckCircle, AlertTriangle, Star, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContractorCheckDemo() {
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
            <h1 className="text-3xl font-bold text-white">Contractor Verification Demo</h1>
            <p className="text-gray-400">Protect yourself from door-to-door scams</p>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-orange-500" />
              Who Knocked? Contractor Lookup
            </CardTitle>
            <CardDescription>Enter the company name or license number to verify credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter company name or license number..."
                className="bg-gray-700 border-gray-600 text-white"
                defaultValue="ABC Roofing Solutions"
              />
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Search className="h-4 w-4 mr-2" />
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Profile */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">ABC Roofing Solutions</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <CardDescription>Licensed roofing contractor in Florida</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">1234 Business Blvd, Tampa, FL 33601</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">(813) 555-0123</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">License #:</span>
                      <span className="text-white font-mono">CCC1234567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Established:</span>
                      <span className="text-white">2015</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    <span className="text-white ml-2">4.8/5</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">127 reviews</span>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-white">License Valid</div>
                        <div className="text-sm text-gray-400">Expires: 12/31/2024</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-white">Insurance Active</div>
                        <div className="text-sm text-gray-400">$2M General Liability</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-white">BBB Accredited</div>
                        <div className="text-sm text-gray-400">A+ Rating</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="font-semibold text-white">1 Complaint</div>
                        <div className="text-sm text-gray-400">Resolved in 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">Completed Project</div>
                      <div className="text-sm text-gray-400">Roof replacement - 456 Oak Street</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">3 days ago</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">License Renewed</div>
                      <div className="text-sm text-gray-400">Florida contractor license updated</div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">1 week ago</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">Insurance Updated</div>
                      <div className="text-sm text-gray-400">General liability coverage renewed</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">2 weeks ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Safety Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-green-500">9.2/10</div>
                <div className="text-sm text-gray-400">Excellent Safety Rating</div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">License Status:</span>
                    <span className="text-green-400">Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Insurance:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Complaints:</span>
                    <span className="text-yellow-400">1 (Resolved)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Years in Business:</span>
                    <span className="text-white">9</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Red Flags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">No door-to-door solicitation reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">No high-pressure sales tactics</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Proper licensing and insurance</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Established business address</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-500/10 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-white mb-2">Still Unsure?</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Get a second opinion or find pre-vetted contractors in your area.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Find Trusted Contractors</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-green-600/20 to-green-500/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Verify Any Contractor Instantly</h3>
            <p className="text-gray-300 mb-4">
              Access our database of 50,000+ contractors with real-time license and insurance verification.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="https://pro.therooffax.com">Upgrade to Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
