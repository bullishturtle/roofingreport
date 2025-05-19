export function TrustStatsBar() {
  return (
    <section className="py-10 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-yellow-500 text-2xl md:text-3xl font-bold mb-2">$3M+</div>
            <div className="text-gray-300 text-sm">In Insurance Claims Reviewed</div>
          </div>

          <div className="p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-700">
            <div className="text-yellow-500 text-2xl md:text-3xl font-bold mb-2">97%</div>
            <div className="text-gray-300 text-sm">Customer Satisfaction Rate</div>
          </div>

          <div className="p-4 border-t md:border-t-0 border-gray-700">
            <div className="text-yellow-500 text-2xl md:text-3xl font-bold mb-2">24,000+</div>
            <div className="text-gray-300 text-sm">Properties Assessed</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustStatsBar
