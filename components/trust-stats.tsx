export default function TrustStats() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-yellow-500">3.5M+</div>
            <div className="text-sm text-gray-300">Roofs Analyzed</div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-yellow-500">15K+</div>
            <div className="text-sm text-gray-300">Active Contractors</div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-yellow-500">98%</div>
            <div className="text-sm text-gray-300">Accuracy Rate</div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-yellow-500">2.5X</div>
            <div className="text-sm text-gray-300">Close Rate Increase</div>
          </div>
        </div>
      </div>
    </section>
  )
}
