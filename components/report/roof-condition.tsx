"use client"

import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function RoofCondition() {
  // Sample data
  const roofData = {
    overallScore: 85,
    estimatedAge: 8,
    remainingLife: 12,
    material: "Asphalt Shingles",
    lastReplaced: "2015-06-10",
    issues: [
      {
        name: "Missing Shingles",
        severity: "Medium",
        description: "Several shingles missing on the south-facing slope",
        recommendation: "Replace missing shingles to prevent water damage",
        images: ["/damaged-roof-shingles.png"],
      },
      {
        name: "Granule Loss",
        severity: "Low",
        description: "Minor granule loss observed in various areas",
        recommendation: "Monitor for increased loss over time",
        images: ["/placeholder-2tqz4.png"],
      },
    ],
    inspectionNotes:
      "Overall the roof is in good condition with minor issues that should be addressed during routine maintenance.",
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
      case "Medium":
        return "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"
      case "Low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
      case "Medium":
        return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
      case "Low":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
      default:
        return <Info className="h-4 w-4 sm:h-5 sm:w-5" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Roof Condition Report
        </h3>
        <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Based on AI analysis of satellite imagery and historical data
        </p>
      </div>

      <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6">
        {/* Overall Score */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Overall Condition</h4>
            <Badge className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 text-white">Good</Badge>
          </div>
          <Progress value={roofData.overallScore} className="h-1.5 sm:h-2" />
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Score: {roofData.overallScore}/100
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h5 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Age</h5>
            <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {roofData.estimatedAge} years
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h5 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Remaining Life</h5>
            <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {roofData.remainingLife} years
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
            <h5 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Material</h5>
            <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{roofData.material}</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="mb-6 sm:mb-8">
          <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
            Detailed Assessment
          </h4>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs sm:text-sm font-medium">Shingle Condition</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">75%</div>
              </div>
              <Progress value={75} className="h-1.5 sm:h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs sm:text-sm font-medium">Structural Integrity</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">90%</div>
              </div>
              <Progress value={90} className="h-1.5 sm:h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs sm:text-sm font-medium">Drainage</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">85%</div>
              </div>
              <Progress value={85} className="h-1.5 sm:h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs sm:text-sm font-medium">Flashing & Seals</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">80%</div>
              </div>
              <Progress value={80} className="h-1.5 sm:h-2" />
            </div>
          </div>
        </div>

        {/* Issues */}
        <div className="mb-6 sm:mb-8">
          <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
            Detected Issues
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {roofData.issues.map((issue, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">
                  <div
                    className={`flex items-center ${getSeverityColor(issue.severity)} rounded-full p-1 mr-2 sm:mr-3`}
                  >
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{issue.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Severity: {issue.severity}</p>
                  </div>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">{issue.description}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Recommendation:
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                    {issue.recommendation}
                  </p>
                  {issue.images && issue.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {issue.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="aspect-video relative overflow-hidden rounded-md">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`${issue.name} image ${imgIndex + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Inspection Notes</h4>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{roofData.inspectionNotes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
