import { AlertTriangle, CloudRain, CheckCircle, AlertCircle, Info } from "lucide-react"

interface ReportPreviewProps {
  address: string
}

export function ReportPreview({ address }: ReportPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b px-4 py-3">
          <h3 className="text-lg font-medium text-gray-900">{address}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Roof Age</span>
                <span className="font-bold">11 Years</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Condition Score</span>
                <span className="font-bold px-2 py-1 bg-yellow-100 text-yellow-800 rounded">B</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Estimated Remaining Life</span>
                <span className="font-bold">7-9 Years</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Material Type</span>
                <span className="font-bold">Asphalt Shingle</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <CloudRain className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Storm History</p>
                  <p className="text-sm">Hailstorm on 03/21/2022</p>
                  <p className="text-sm">Wind Event on 07/12/2023</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Contractor Warning</p>
                  <p className="text-sm">Unverified roofer activity in your ZIP this week</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">AI Recommendation</p>
                  <p className="text-sm">Inspection suggested within 2 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b px-4 py-3">
          <h3 className="text-lg font-medium text-gray-900">Roof Details</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Total Area</span>
                <span className="font-bold">2,340 sq ft</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Pitch</span>
                <span className="font-bold">6:12</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Valleys</span>
                <span className="font-bold">4</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Ridges</span>
                <span className="font-bold">78 linear ft</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Hips</span>
                <span className="font-bold">42 linear ft</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Eaves</span>
                <span className="font-bold">124 linear ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b px-4 py-3">
          <h3 className="text-lg font-medium text-gray-900">Potential Issues</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Granule Loss</p>
                <p className="text-sm text-gray-600">Moderate granule loss detected in south-facing slopes</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Potential Hail Damage</p>
                <p className="text-sm text-gray-600">Signs of impact damage from March 2022 storm</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Flashing</p>
                <p className="text-sm text-gray-600">No visible issues with flashing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
