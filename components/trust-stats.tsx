export function TrustStats() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border border-gray-800 bg-gray-900/30 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">3.5M+</div>
            <div className="text-sm text-gray-300">Roofs Analyzed</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/30 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">15K+</div>
            <div className="text-sm text-gray-300">Active Contractors</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/30 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">98%</div>
            <div className="text-sm text-gray-300">Accuracy Rate</div>
          </div>

          <div className="border border-gray-800 bg-gray-900/30 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">2.5X</div>
            <div className="text-sm text-gray-300">Close Rate Increase</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustStats
