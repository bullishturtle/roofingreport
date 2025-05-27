import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Home, ArrowLeft, Calendar, DollarSign, Wrench, FileText } from "lucide-react"
import Link from "next/link"

export default function PropertyHistoryDemo() {
  const historyEvents = [
    {
      date: "September 2022",
      type: "Storm Damage",
      description: "Hurricane Ian caused significant roof damage",
      cost: "$24,500",
      status: "Insurance Claim Approved",
      icon: <Calendar className="h-5 w-5 text-red-500" />,
      color: "red",
    },
    {
      date: "March 2021",
      type: "Routine Maintenance",
      description: "Gutter cleaning and minor shingle repairs",
      cost: "$850",
      status: "Completed",
      icon: <Wrench className="h-5 w-5 text-blue-500" />,
      color: "blue",
    },
    {
      date: "August 2020",
      type: "Inspection",
      description: "Annual roof inspection - no issues found",
      cost: "$200",
      status: "Passed",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      color: "green",
    },
    {
      date: "June 2018",
      type: "New Construction",
      description: "Original roof installation - architectural shingles",
      cost: "$18,500",
      status: "Completed",
      icon: <Home className="h-5 w-5 text-purple-500" />,
      color: "purple",
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
            <h1 className="text-3xl font-bold text-white">Property History Demo</h1>
            <p className="text-gray-400">Complete timeline for: 123 Main Street, Tampa, FL 33601</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="h-5 w-5 text-orange-500" />
                  Property Timeline
                </CardTitle>
                <CardDescription>Complete history of repairs, maintenance, and inspections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {historyEvents.map((event, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index < historyEvents.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-600"></div>
                      )}

                      <div className="flex gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            event.color === "red"
                              ? "bg-red-500/20 border-red-500"
                              : event.color === "blue"
                                ? "bg-blue-500/20 border-blue-500"
                                : event.color === "green"
                                  ? "bg-green-500/20 border-green-500"
                                  : "bg-purple-500/20 border-purple-500"
                          } border-2`}
                        >
                          {event.icon}
                        </div>

                        <div className="flex-1">
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-white">{event.type}</h3>
                              <Badge
                                className={`${
                                  event.color === "red"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : event.color === "blue"
                                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                      : event.color === "green"
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                }`}
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-3">{event.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Date:</span>
                                <div className="text-white">{event.date}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Cost:</span>
                                <div className="text-white font-semibold">{event.cost}</div>
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

            {/* Ownership History */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Ownership History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">Current Owner</div>
                      <div className="text-sm text-gray-400">John & Jane Smith (2018 - Present)</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">6 years</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-white">Previous Owner</div>
                      <div className="text-sm text-gray-400">Builder - Tampa Homes LLC (2018)</div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">New Construction</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Property Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Built:</span>
                    <span className="text-white">2018</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Roof Age:</span>
                    <span className="text-white">6 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Inspection:</span>
                    <span className="text-white">Aug 2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Repairs:</span>
                    <span className="text-white">3</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <h4 className="font-semibold text-white mb-2">Maintenance Score</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">8.5/10</div>
                    <div className="text-sm text-gray-400">Well Maintained</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Invested:</span>
                  <span className="text-white">$44,050</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Insurance Claims:</span>
                  <span className="text-white">$24,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Out of Pocket:</span>
                  <span className="text-white">$19,550</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
                  <span className="text-white">Current Value:</span>
                  <span className="text-green-500">$385,000</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Gutter Cleaning:</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Due Soon</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Roof Inspection:</span>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Overdue</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Shingle Replacement:</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-orange-600 hover:bg-orange-700">Download Full History</Button>
          </div>
        </div>

        {/* Upgrade CTA */}
        <Card className="mt-8 bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get Complete Property History</h3>
            <p className="text-gray-300 mb-4">
              Access detailed property timelines, ownership records, and maintenance schedules for any address.
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
