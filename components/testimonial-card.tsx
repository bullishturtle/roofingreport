"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image?: string
}

export function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
        <CardContent className="pt-6">
          <Quote className="h-8 w-8 text-blue-400/20 mb-2" />
          <p className="text-sm text-white/70">{quote}</p>
        </CardContent>
        <CardFooter className="border-t border-white/10 bg-white/5 px-6 py-4">
          <div>
            <p className="font-medium text-white">{author}</p>
            <p className="text-xs text-white/50">{role}</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
