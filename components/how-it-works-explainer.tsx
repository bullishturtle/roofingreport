"use client"

import { ArrowRight, Search, BarChart, FileText } from "lucide-react"

export function HowItWorksExplainer() {
  return (
    <section className="py-16 md:py-24 bg-gray-900" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How RoofFax Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get comprehensive roof and property reports in three simple steps. No complicated setup, no waiting for
            days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10"></div>

          {/* Connection line for mobile */}
          <div className="md:hidden absolute top-0 left-1/2 h-full w-0.5 bg-gray-800 -z-10"></div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 relative">
            <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
              1
            </div>
            <div className="text-center">
              <Search className="h-10 w-10 text-yellow-500 mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-2">Enter Address</h3>
              <p className="text-gray-400">
                Simply enter your property address to start the process. Our system will locate your property instantly.
              </p>
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-yellow-500">
              <ArrowRight className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 relative">
            <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
              2
            </div>
            <div className="text-center">
              <BarChart className="h-10 w-10 text-yellow-500 mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-400">
                Our AI analyzes satellite imagery, public records, and weather data to create a comprehensive
                assessment.
              </p>
            </div>
            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-yellow-500">
              <ArrowRight className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
              3
            </div>
            <div className="text-center">
              <FileText className="h-10 w-10 text-yellow-500 mb-4 mx-auto" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-2">Get Report</h3>
              <p className="text-gray-400">
                Receive a detailed report with measurements, condition assessment, and actionable recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-8 py-3 rounded-md transition-all duration-200"
            onClick={() => (window.location.href = "/demo")}
            aria-label="Try RoofFax with a demo"
          >
            Try It Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksExplainer
