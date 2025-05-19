"use client"

import { AlertTriangle, CloudRain, Info } from "lucide-react"

interface ReportPreviewProps {
  address: string
}

export default function ReportPreview({ address }: ReportPreviewProps) {
  // Generate mock data based on the address
  const generateMockData = () => {
    // Use the address string to generate consistent mock data
    const addressSum = address.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)

    return {
      roofAge: 5 + (addressSum % 15), // 5-20 years
      conditionScore: ["A", "B", "C", "D"][addressSum % 4],
      estimatedLife: `${5 + (addressSum % 10)}-${7 + (addressSum % 10)} Years`,
      materialType: ["Asphalt Shingle", "Metal", "Tile", "Slate"][addressSum % 4],
      stormHistory: [
        { type: "Hailstorm", date: "03/21/2022" },
        { type: "Wind Event", date: "07/12/2023" },
      ],
      contractorWarning: addressSum % 2 === 0,
      aiRecommendation: ["Inspection suggested within 2 weeks", "Maintenance recommended", "No immediate action needed"][
        addressSum % 3
      ],
      totalArea: 2000 + (addressSum % 1000),
      pitch: ["4:12", "5:12", "6:12", "7:12"][addressSum % 4],
      valleys: 2 + (addressSum % 4),
      ridges: 60 + (addressSum % 40),
      hips: 30 + (addressSum % 30),
      eaves: 100 + (addressSum % 50),
      issues: [
        {
          type: "Granule Loss",
          severity: "Moderate",
          description: "Moderate granule loss detected in south-facing slopes",
          critical: false,
        },
        {
          type: "Potential Hail Damage",
          severity: "High",
          description: "Signs of impact damage from March 2022 storm",
          critical: true,
        },
        {
          type: "Flashing",
          severity: "Good",
          description: "No visible issues with flashing",
          critical: false,
        },
      ],
    }
  }

  const data = generateMockData()

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
                <span className="font-bold">{data.roofAge} Years</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Condition Score</span>
                <span
                  className={`font-bold px-2 py-1 rounded ${
                    data.conditionScore === "A"
                      ? "bg-green-100 text-green-800"
                      : data.conditionScore === "B"
                        ? "bg-yellow-100 text-yellow-800"
                        : data.conditionScore === "C"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.conditionScore}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Estimated Remaining Life</span>
                <span className="font-bold">{data.estimatedLife}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Material Type</span>
                <span className="font-bold">{data.materialType}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <CloudRain className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Storm History</p>
                  {data.stormHistory.map((storm, index) => (
                    <p key={index} className="text-sm">
                      {storm.type} on {storm.date}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Contractor Warning</p>
                  <p className="text-sm">
                    {data.contractorWarning
                      ? "Unverified roofer activity in your ZIP this week"
                      : "No suspicious contractor activity reported"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">AI Recommendation</p>
                  <p className="text-sm">{data.aiRecommendation}</p>
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
                <span className="font-bold">{data.totalArea.toLocaleString()} sq ft</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Pitch</span>
                <span className="font-bold">{data.pitch}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Valleys</span>
                <span className="font-bold">{data.valleys}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Ridges</span>
                <span className="font-bold">{data.ridges} linear ft</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-\
