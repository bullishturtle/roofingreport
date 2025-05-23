import { Users, TrendingUp, ClipboardCheck, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProFeatures() {
  return (
    <section className="py-16 bg-gray-50" id="pro-features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">For Professionals</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Grow your roofing business with powerful tools and insights
          </p>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Build Client Trust</h3>
            <p className="text-gray-500">
              Provide transparent, data-backed assessments that build trust and credibility with clients.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Increase Close Rates</h3>
            <p className="text-gray-500">
              Win more business with professional reports and data-driven recommendations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <ClipboardCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Streamlined Workflow</h3>
            <p className="text-gray-500">
              Save time with automated measurements, condition assessments, and report generation.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Business Analytics</h3>
            <p className="text-gray-500">Track performance, identify trends, and optimize your business operations.</p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-3xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <img
                  src="/images/thomas-roofus-clipboard.png"
                  alt="RoofFax Pro"
                  className="rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold">Join RoofFax Pro</h3>
                <p className="text-gray-500">
                  Take your roofing business to the next level with our professional tools and resources.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup?type=pro">
                    <Button size="lg">Sign Up for Pro</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
