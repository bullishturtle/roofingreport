import { CheckCircle, Shield, Clock, BarChart, Zap, Compass } from "lucide-react"

export function Features() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-yellow-500">RoofFax</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">The complete platform for all your roofing needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <Shield className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Accurate Measurements</h3>
            <p className="text-gray-300">
              Get precise roof measurements without climbing a ladder. Our space-age technology provides accurate data.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <Clock className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Save Time</h3>
            <p className="text-gray-300">
              Generate comprehensive roof reports in minutes, not hours. Focus on closing deals, not paperwork.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <BarChart className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Analysis</h3>
            <p className="text-gray-300">
              Get condition assessments, damage detection, and actionable insights for every property.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <Zap className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Reports</h3>
            <p className="text-gray-300">
              Access your reports instantly. Share them with homeowners and crews with a single click.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <Compass className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Storm Tracking</h3>
            <p className="text-gray-300">
              Stay ahead of the weather. Track storms and identify affected properties in your area.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
            <CheckCircle className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Trusted Results</h3>
            <p className="text-gray-300">
              Join thousands of contractors who trust RoofFax for accurate, reliable roof data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
