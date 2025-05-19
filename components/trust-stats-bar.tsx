export function TrustStatsBar() {
  return (
    <section className="py-8 bg-black border-y border-gray-800" id="trust-stats-bar">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500 mr-3">$3M+</span>
            <span className="text-gray-300">in claims reviewed</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500 mr-3">98%</span>
            <span className="text-gray-300">accuracy rate</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500 mr-3">15K+</span>
            <span className="text-gray-300">contractors trust us</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustStatsBar
