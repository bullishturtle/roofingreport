"use client"

import { Wifi, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePageClient() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <Wifi className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Offline</h1>
          <p className="text-gray-600">
            It looks like you've lost your internet connection. Some features may be limited while offline.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <div className="text-sm text-gray-500">
            <p>While offline, you can still:</p>
            <ul className="mt-2 space-y-1">
              <li>• View previously loaded pages</li>
              <li>• Access cached content</li>
              <li>• Use basic navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
