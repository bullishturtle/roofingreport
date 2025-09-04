import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle } from "lucide-react"

export default function SuccessLoading() {
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
            <Skeleton className="h-10 w-32 bg-slate-700" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Processing...</h1>
            <Skeleton className="h-6 w-64 bg-slate-700 mx-auto mb-2" />
            <Skeleton className="h-4 w-48 bg-slate-700 mx-auto" />
          </div>

          {/* Loading Cards */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-48 bg-slate-700 mx-auto mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 bg-slate-700 mb-2" />
                      <Skeleton className="h-4 w-full bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-40 bg-slate-700 mx-auto mb-6" />
              <Skeleton className="h-4 w-full bg-slate-700 mx-auto mb-6" />
              <div className="grid md:grid-cols-2 gap-4">
                <Skeleton className="h-32 bg-slate-700" />
                <Skeleton className="h-32 bg-slate-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6 text-center">
              <Skeleton className="h-6 w-48 bg-slate-700 mx-auto mb-4" />
              <Skeleton className="h-4 w-full bg-slate-700 mx-auto mb-6" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Skeleton className="h-5 w-32 bg-slate-700" />
                <Skeleton className="h-5 w-40 bg-slate-700" />
              </div>
              <Skeleton className="h-4 w-64 bg-slate-700 mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
