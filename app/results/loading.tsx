import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Camera, MapPin } from "lucide-react"

export default function ResultsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax
              </span>
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-32 bg-slate-700" />
              <Skeleton className="h-10 w-28 bg-slate-700" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Report Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <FileText className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Generating Your Report...</h1>
            <p className="text-lg text-slate-300 mb-4">AI analysis in progress</p>
            <Progress value={75} className="max-w-md mx-auto" />
          </div>

          {/* Property Info Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Address</p>
                  <Skeleton className="h-5 w-full bg-slate-700" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Analysis Date</p>
                  <Skeleton className="h-5 w-32 bg-slate-700" />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Last Major Storm</p>
                  <Skeleton className="h-5 w-48 bg-slate-700" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Risk Level</p>
                  <Skeleton className="h-6 w-24 bg-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Score Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Overall Roof Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Score</span>
                    <Skeleton className="h-5 w-12 bg-slate-700" />
                  </div>
                  <Skeleton className="h-3 w-full bg-slate-700" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-12 w-16 bg-slate-700 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Health Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Findings Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                Analyzing Satellite Imagery...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-5 h-5 rounded-full bg-slate-700" />
                      <Skeleton className="h-5 w-32 bg-slate-700" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-5 w-12 bg-slate-700" />
                      <Skeleton className="h-6 w-20 bg-slate-700" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full bg-slate-700 mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-700" />
                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Analysis Status */}
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Processing Your Roof Analysis</h3>
              <div className="space-y-3 text-slate-300 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Satellite imagery downloaded</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Storm history cross-referenced</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>AI damage detection in progress...</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <span>Generating recommendations</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">This usually takes 30-60 seconds. Please don't refresh the page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
