"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export default function AddressInput() {
  const [address, setAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      console.log("Address submitted:", address)
      // Show a modal or notification
      alert(`Report requested for: ${address}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter property address..."
            className="w-full pl-12 pr-4 py-4 rounded-full bg-black/30 border-2 border-gray-700 focus:border-yellow-500 outline-none transition-colors text-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 active:scale-95"
        >
          Get Report
        </button>
      </form>
    </div>
  )
}
