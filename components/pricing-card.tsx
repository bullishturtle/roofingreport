"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline" | "secondary"
  highlighted?: boolean
  className?: string
  priceClass?: string
  buttonClass?: string
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
  className = "",
  priceClass = "",
  buttonClass = "",
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`flex flex-col ${highlighted ? "shadow-lg relative" : ""} ${className}`}>
        {highlighted && (
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none px-3 py-1">
              Most Popular
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          <div className="flex items-baseline">
            <span className={`text-3xl font-bold ${priceClass}`}>{price}</span>
            <span className="text-white/50 ml-1">/ month</span>
          </div>
          <CardDescription className="text-white/70">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-2 text-sm">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-white/80">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className={`w-full ${buttonClass}`} variant={buttonVariant} asChild>
            <Link href="/signup">{buttonText}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
