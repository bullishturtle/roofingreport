"use client"

import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
        ))}
      </div>

      <p className="text-gray-700 mb-4 italic">"{quote}"</p>

      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  )
}
