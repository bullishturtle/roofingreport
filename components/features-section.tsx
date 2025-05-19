import { Zap, Shield, BarChart3, Clock } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Redefining Roof & Property Reports</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you're a homeowner navigating a storm claim or a contractor closing your next project, RoofFax
            equips you with instant, AI-powered insights that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="text-yellow-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Reports</h3>
            <p className="text-gray-400">
              Get comprehensive roof reports in seconds, not days. Our AI-powered platform delivers immediate insights.
            </p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="text-yellow-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Truth & Transparency</h3>
            <p className="text-gray-400">
              Make decisions with confidence using accurate, unbiased data about your roof's condition and value.
            </p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="text-yellow-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Insights</h3>
            <p className="text-gray-400">
              Access detailed measurements, damage assessments, and material estimates backed by advanced analytics.
            </p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="text-yellow-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Time-Saving Technology</h3>
            <p className="text-gray-400">
              Eliminate juggling multiple apps with our all-in-one platform for measurements, tracking, and outreach.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
