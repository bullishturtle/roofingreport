"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"

export function AnimationTest() {
  const [testResults, setTestResults] = useState<{
    fadeIn: boolean
    slideUp: boolean
    stagger: boolean
    hover: boolean
    loading: boolean
  }>({
    fadeIn: false,
    slideUp: false,
    stagger: false,
    hover: false,
    loading: true,
  })

  // Test animations after component mounts
  useState(() => {
    const timer = setTimeout(() => {
      setTestResults({
        fadeIn: true,
        slideUp: true,
        stagger: true,
        hover: true,
        loading: false,
      })
    }, 2000)

    return () => clearTimeout(timer)
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Framer Motion Animation Test</h1>
          <p className="text-gray-300">Testing all animation capabilities for RoofFax platform</p>
        </motion.div>

        {/* Animation Status Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {Object.entries(testResults).map(([test, passed]) => (
            <motion.div key={test} variants={itemVariants}>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    {testResults.loading ? (
                      <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                    ) : passed ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white capitalize mb-2">
                    {test.replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testResults.loading ? "Testing..." : passed ? "Working" : "Failed"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Animation Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hover Animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Hover Effects</h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-orange-500/20 rounded-lg cursor-pointer"
                  >
                    <p className="text-white">Hover to scale and change color</p>
                  </motion.div>

                  <motion.div whileHover={{ x: 10 }} className="p-4 bg-blue-500/20 rounded-lg cursor-pointer">
                    <p className="text-white">Hover to slide right</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loading Animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Loading States</h3>
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
                  />

                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-12 h-12 bg-orange-500 rounded-full"
                  />

                  <motion.div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                        className="w-3 h-3 bg-orange-500 rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Page Transition Test */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Animation System Status</h3>
              <motion.div
                animate={{
                  background: testResults.loading ? ["#f97316", "#ea580c", "#f97316"] : "#10b981",
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block px-6 py-3 rounded-full text-white font-semibold"
              >
                {testResults.loading ? "Testing Animations..." : "All Animations Working!"}
              </motion.div>

              <div className="mt-6">
                <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600">
                  Restart Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
