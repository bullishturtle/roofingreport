"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
  titleClass?: string
}

export function FeatureCard({ icon, title, description, className = "", titleClass = "" }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {icon || <CheckCircle className="h-5 w-5 text-blue-400" />}
            <CardTitle className={`text-lg text-white ${titleClass}`}>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-white/70">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
