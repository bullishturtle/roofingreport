"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export function AddressForm() {
  const [address, setAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Address submitted:", address)
    // Show a modal or alert with the address
    alert(`Getting report for: ${address}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your property address"
          className="w-full px-4 py-3 pl-12 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
          required
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button
        type="submit"
        className="mt-3 w-full px-4 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition-colors"
      >
        Get Roof Report
      </button>
    </form>
  )
}
