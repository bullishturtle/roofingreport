import { CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-black" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How RoofFax Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get your comprehensive roof report in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="bg-yellow-500/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-yellow-500 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Enter Your Address</h3>
            <p className="text-gray-400 mb-4">
              Simply enter your property address in the search bar and click "Get Report"
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Works for any US residential address</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">No credit card required to start</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="bg-yellow-500/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-yellow-500 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Analyzes Your Roof</h3>
            <p className="text-gray-400 mb-4">
              Our AI technology scans satellite imagery and property data to generate your report
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Measures roof dimensions accurately</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Identifies potential damage areas</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
            <div className="bg-yellow-500/20 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-yellow-500 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Get Your Detailed Report</h3>
            <p className="text-gray-400 mb-4">
              Receive a comprehensive report with measurements, condition assessment, and recommendations
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">View interactive 3D model of your roof</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Download PDF or share with contractors</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-xl">
            <h3 className="text-xl font-bold text-white mb-2">Need Help With Your Report?</h3>
            <p className="text-gray-400 mb-4">
              Schedule a free consultation with one of our roof experts to review your report and answer any questions.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-md transition-colors duration-200">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
