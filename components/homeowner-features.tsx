import { Shield, Home, FileText, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomeownerFeatures() {
  return (
    <section className="py-16 bg-white" id="homeowner-features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">For Homeowners</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Make informed decisions about your home with comprehensive roof information
          </p>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Protect Your Investment</h3>
            <p className="text-gray-500">
              Understand your roof's condition and take proactive measures to protect your home's value.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Home Purchase Confidence</h3>
            <p className="text-gray-500">
              Know what you're buying with detailed roof history and condition reports for any property.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Insurance Documentation</h3>
            <p className="text-gray-500">
              Get professional documentation to support insurance claims and coverage requirements.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg border">
            <div className="bg-primary/10 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Budget Planning</h3>
            <p className="text-gray-500">
              Plan for future roof maintenance and replacement with accurate cost estimates.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="bg-gray-50 p-8 rounded-lg max-w-3xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <img
                  src="/images/roofus-portrait.png"
                  alt="RoofFax Mascot"
                  className="rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold">Get Your Roof Report Today</h3>
                <p className="text-gray-500">
                  Don't wait until you have roof problems. Get a comprehensive assessment of your roof's condition and
                  value now.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Learn More
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
