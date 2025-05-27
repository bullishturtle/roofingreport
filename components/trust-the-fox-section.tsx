import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, Heart } from "lucide-react"
import Link from "next/link"

export function TrustTheFoxSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/trust-the-fox-logo.png" alt="Trust the Fox" className="h-12 w-12" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Trust the Fox</h2>
            </div>

            <p className="text-xl text-blue-100 leading-relaxed">
              Are you a homeowner looking for free tools to check your roof and verify contractors? Trust the Fox is our
              consumer-focused platform designed just for you.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Home className="h-6 w-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Free Property Reports</h3>
                  <p className="text-blue-200">Get basic roof information for your home at no cost</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Contractor Safety</h3>
                  <p className="text-blue-200">Verify who's knocking on your door before letting them on your roof</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Homeowner Focused</h3>
                  <p className="text-blue-200">Simple tools designed specifically for homeowners, not contractors</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="https://trustthefox.com">Visit Trust the Fox</Link>
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Home className="h-12 w-12 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white">Perfect for Homeowners</h3>

                <p className="text-blue-100">
                  While RoofFax serves professionals, Trust the Fox gives homeowners the power to make informed
                  decisions about their roof and the contractors they hire.
                </p>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm text-blue-200 italic">
                    "Finally, a way to check if the contractor at my door is legitimate. Trust the Fox saved me from a
                    potential scam!"
                  </p>
                  <p className="text-xs text-blue-300 mt-2">- Sarah M., Tampa FL</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
