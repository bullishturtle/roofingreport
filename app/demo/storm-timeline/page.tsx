import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CloudRain, Wind, Zap, Calendar, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function StormTimelineDemo() {
  const storms = [
    {
      name: "Hurricane Ian",
      date: "September 28, 2022",
      category: "Category 4",
      windSpeed: "150 mph",
      impact: "High",
      damage: "Severe roof damage likely",
      color: "red",
    },
    {
      name: "Hurricane Elsa",
      date: "July 7, 2021",
      category: "Category 1",
      windSpeed: "75 mph",
      impact: "Medium",
      damage: "Minor shingle damage possible",
      color: "yellow",
    },
    {
      name: "Tropical Storm Eta",
      date: "November 12, 2020",
      category: "Tropical Storm",
      windSpeed: "65 mph",
      impact: "Low",
      damage: "Minimal damage expected",
      color: "green",
    },
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
            <h1 className="text-3xl font-bold text-white">Storm Timeline Demo</h1>
            <p className="text-gray-400">Property: 123 Main Street, Tampa, FL 33601</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  Storm History (Last 3 Years)
                </CardTitle>
                <CardDescription>Major weather events affecting this property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {storms.map((storm, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index < storms.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-600"></div>
                      )}

                      <div className="flex gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            storm.color === "red"
                              ? "bg-red-500/20 border-red-500"
                              : storm.color === "yellow"
                                ? "bg-yellow-500/20 border-yellow-500"
                                : "bg-green-500/20 border-green-500"
                          } border-2`}
                        >
                          {storm.category.includes("Hurricane") ? (
                            <Wind
                              className={`h-6 w-6 ${
                                storm.color === "red"
                                  ? "text-red-500"
                                  : storm.color === "yellow"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            />
                          ) : (
                            <CloudRain
                              className={`h-6 w-6 ${
                                storm.color === "red"
                                  ? "text-red-500"
                                  : storm.color === "yellow"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-white">{storm.name}</h3>
                              <Badge
                                className={`${
                                  storm.color === "red"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : storm.color === "yellow"
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : "bg-green-500/20 text-green-400 border-green-500/30"
                                }`}
                              >
                                {storm.impact} Impact
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Date:</span>
                                <div className="text-white">{storm.date}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Category:</span>
                                <div className="text-white">{storm.category}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Wind Speed:</span>
                                <div className="text-white">{storm.windSpeed}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Damage:</span>
                                <div className="text-white">{storm.damage}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Data */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Detailed Weather Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-500">3</div>
                    <div className="text-sm text-gray-400">Major Hurricanes</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-500">7</div>
                    <div className="text-sm text-gray-400">Tropical Storms</div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-500">150mph</div>
                    <div className="text-sm text-gray-400">Max Wind Speed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hurricane Risk:</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">High</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Flood Risk:</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hail Risk:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Low</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <h4 className="font-semibold text-white mb-2">Insurance Claims</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Filed:</span>
                      <span className="text-white">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Approved:</span>
                      <span className="text-white">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Payout:</span>
                      <span className="text-white">$24,500</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Next Storm Season
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-500">June 1, 2024</div>
                  <div className="text-sm text-gray-400">Hurricane Season Starts</div>
                  <div className="text-xs text-gray-500 mt-4">Get prepared with our storm readiness checklist</div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-orange-600 hover:bg-orange-700">Download Storm Report</Button>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get Complete Storm Analysis</h3>
            <p className="text-gray-300 mb-4">
              Access 10+ years of weather data, insurance claim history, and predictive analytics.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="https://pro.therooffax.com">Upgrade to Pro</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
