export function TrustStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">$1.2M+</div>
        <p className="text-gray-700">in insurance claims approved</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
        <p className="text-gray-700">RoofFax reports delivered</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
        <p className="text-gray-700">accuracy rating</p>
      </div>
    </div>
  )
}
