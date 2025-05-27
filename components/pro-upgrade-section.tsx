import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export function ProUpgradeSection() {
  const features = [
    "Unlimited property searches",
    "Advanced aerial measurements",
    "Complete storm history",
    "AI-generated proposals",
    "Skip tracing & owner contact info",
    "White-label reports",
    "API access",
    "Priority support",
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">For Professionals</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Go <span className="text-orange-500">Pro</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock the full power of RoofFax with unlimited searches, advanced tools, and professional features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Free Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-white">
                $0<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" />1 free search per day
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" />
                  Basic property info
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" />
                  Contractor verification
                </li>
              </ul>
              <p className="text-sm text-gray-400">Perfect for occasional use</p>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-gradient-to-b from-orange-500/20 to-orange-600/20 border-orange-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-orange-500" />
                RoofFax Pro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-white">
                $97<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-2">
                {features.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <Check className="h-4 w-4 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href="https://pro.therooffax.com">Start Pro Trial</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-500" />
                Enterprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-white">Custom</div>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <Check className="h-4 w-4 text-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Join over 10,000+ roofing professionals using RoofFax Pro</p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
            <span>✓ 30-day free trial</span>
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  )
}
