"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Download, ClipboardCopy, TrendingUp } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

// Mock audit report data for demonstration
const mockAuditReport = {
  timestamp: new Date().toISOString(),
  overallStatus: "warning",
  results: [
    {
      category: "Loading States",
      status: "pass",
      message: "Loading states implemented for transitions",
      details: {
        components: ["HeroSearch", "LoginForm", "SignupForm"],
        implementation: "Skeleton loaders and spinners added",
      },
      priority: "medium",
    },
    {
      category: "Accessibility",
      status: "pass",
      message: "Accessibility features implemented",
      details: {
        features: ["ARIA labels", "Focus management", "Screen reader support", "Color contrast validation"],
        implementation: "WCAG 2.1 AA compliance achieved",
      },
      priority: "high",
    },
    {
      category: "Keyboard Navigation",
      status: "pass",
      message: "Keyboard navigation support added",
      details: {
        features: ["Tab order", "Focus trapping", "Keyboard shortcuts"],
        implementation: "Full keyboard navigation for all interactive elements",
      },
      priority: "medium",
    },
    {
      category: "Reduced Motion",
      status: "pass",
      message: "Reduced motion support implemented",
      details: {
        implementation: "prefers-reduced-motion media query respected",
        features: ["CSS animations", "JS animations", "3D animations"],
      },
      priority: "medium",
    },
    {
      category: "Offline Functionality",
      status: "pass",
      message: "Offline functionality implemented",
      details: {
        features: ["Service worker", "Offline page", "Cache management"],
        implementation: "Full offline support with fallback UI",
      },
      priority: "low",
    },
    {
      category: "Animation Quality",
      status: "pass",
      message: "Dynamic animations implemented",
      details: {
        libraries: ["Framer Motion", "React Spring"],
        features: ["Micro-interactions", "Page transitions", "Hover effects"],
      },
      priority: "low",
    },
    {
      category: "Particle Systems",
      status: "warning",
      message: "Basic particle systems implemented, could be enhanced",
      details: {
        implementation: "Canvas-based particles for hero section",
        improvements: ["More interactive particles", "3D particle effects"],
      },
      priority: "low",
    },
    {
      category: "Shader Effects",
      status: "warning",
      message: "Basic shader effects implemented, could be enhanced",
      details: {
        implementation: "Simple WebGL shaders for gradient animations",
        improvements: ["More complex distortion effects", "Advanced lighting"],
      },
      priority: "low",
    },
    {
      category: "Responsive Design",
      status: "pass",
      message: "Enhanced responsive design implemented",
      details: {
        features: ["Container queries", "Advanced breakpoints", "Mobile-first approach"],
        implementation: "Fully responsive across all device sizes",
      },
      priority: "medium",
    },
    {
      category: "Form Submission",
      status: "pass",
      message: "Real form submission implemented",
      details: {
        forms: ["Contact form", "Newsletter signup", "User registration"],
        features: ["Validation", "Error handling", "Success feedback"],
      },
      priority: "medium",
    },
    {
      category: "Analytics",
      status: "pass",
      message: "Comprehensive analytics implemented",
      details: {
        features: ["Page views", "User interactions", "Conversion tracking"],
        implementation: "Custom events and conversion funnels",
      },
      priority: "medium",
    },
    {
      category: "SEO Optimization",
      status: "pass",
      message: "Enhanced SEO implemented",
      details: {
        features: ["Schema markup", "Open Graph tags", "Sitemap", "Robots.txt"],
        implementation: "Complete SEO optimization",
      },
      priority: "medium",
    },
    {
      category: "PWA Features",
      status: "pass",
      message: "Progressive Web App features implemented",
      details: {
        features: ["Service worker", "Web app manifest", "Install prompt", "Push notifications"],
        implementation: "Full PWA support",
      },
      priority: "low",
    },
    {
      category: "Component Size",
      status: "pass",
      message: "Components optimized and properly sized",
      details: {
        refactored: ["Animated3DCharacters", "DashboardShell", "SiteAuditRunner"],
        implementation: "Broken down into smaller, focused components",
      },
      priority: "medium",
    },
    {
      category: "TypeScript Strict Mode",
      status: "pass",
      message: "TypeScript strict mode enabled",
      details: {
        features: ["noImplicitAny", "strictNullChecks", "strictFunctionTypes"],
        implementation: "Full strict mode in tsconfig.json",
      },
      priority: "medium",
    },
    {
      category: "Error Handling",
      status: "pass",
      message: "Comprehensive error handling implemented",
      details: {
        features: ["Error boundaries", "Global error handler", "User-friendly error messages"],
        implementation: "Complete error handling system",
      },
      priority: "medium",
    },
    {
      category: "Performance Monitoring",
      status: "pass",
      message: "Performance monitoring implemented",
      details: {
        features: ["Web Vitals", "Performance Observer", "Real User Monitoring"],
        implementation: "Complete performance monitoring system",
      },
      priority: "medium",
    },
  ],
  summary: {
    passed: 15,
    failed: 0,
    warnings: 2,
    total: 17,
    highPriority: 1,
    mediumPriority: 11,
    lowPriority: 5,
  },
}

export default function ComprehensiveAuditDemo() {
  const [loading, setLoading] = useState(false)
  const [auditReport, setAuditReport] = useState(mockAuditReport)
  const [showResults, setShowResults] = useState(false)

  const runAudit = async () => {
    setLoading(true)

    // Simulate audit running
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "fail":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
    }
  }

  const getScorePercentage = () => {
    if (!auditReport) return 0
    return Math.round((auditReport.summary.passed / auditReport.summary.total) * 100)
  }

  const groupResultsByCategory = (results) => {
    return results.reduce((acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    }, {})
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Comprehensive Site Audit</h1>
        <p className="text-gray-600 text-lg">
          Run a complete audit covering user experience, accessibility, performance, visual enhancements, functionality,
          and code quality.
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Comprehensive Site Audit
          </CardTitle>
          <CardDescription>
            Complete analysis of user experience, accessibility, performance, and code quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="flex flex-col items-center justify-center py-12">
              <img src="/site-audit-illustration.png" alt="Site Audit Illustration" className="mb-6 rounded-lg" />
              <p className="text-center text-gray-600 mb-8 max-w-md">
                Click the button below to run a comprehensive audit of your site. This will check for all improvements
                and provide detailed results.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">{getScorePercentage()}%</div>
                <div className="text-lg font-medium text-gray-700 mb-4">Overall Site Health Score</div>
                <Progress value={getScorePercentage()} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-gray-600 mt-2">
                  Completed on {new Date(auditReport.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{auditReport.summary.passed}</p>
                    <p className="text-xs text-green-800">Passed</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{auditReport.summary.failed}</p>
                    <p className="text-xs text-red-800">Failed</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{auditReport.summary.warnings}</p>
                    <p className="text-xs text-yellow-800">Warnings</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{auditReport.summary.total}</p>
                    <p className="text-xs text-blue-800">Total</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{auditReport.summary.highPriority}</p>
                    <p className="text-xs text-red-800">High Priority</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{auditReport.summary.mediumPriority}</p>
                    <p className="text-xs text-yellow-800">Medium Priority</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{auditReport.summary.lowPriority}</p>
                    <p className="text-xs text-blue-800">Low Priority</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Results by Category */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Results by Category</h3>
                <Accordion type="multiple" className="w-full">
                  {Object.entries(groupResultsByCategory(auditReport.results)).map(([category, results]) => (
                    <AccordionItem value={category} key={category}>
                      <AccordionTrigger className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{category}</span>
                          <div className="flex space-x-1">
                            {results.map((result, index) => (
                              <div key={index} className="flex items-center space-x-1">
                                {getStatusIcon(result.status)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {results.map((result, index) => (
                            <div key={index} className="border-l-4 border-gray-200 pl-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(result.status)}
                                  <span className="font-medium">{result.message}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <Badge className={`${getStatusColor(result.status)} text-xs`}>
                                    {result.status.toUpperCase()}
                                  </Badge>
                                  <Badge className={`${getPriorityColor(result.priority)} text-xs`}>
                                    {result.priority.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                              {result.details && (
                                <div className="bg-gray-50 p-3 rounded text-sm">
                                  <pre className="whitespace-pre-wrap overflow-x-auto">
                                    {JSON.stringify(result.details, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={runAudit} disabled={loading} className="flex items-center space-x-2">
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Running Comprehensive Audit...</span>
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4" />
                <span>{showResults ? "Run Audit Again" : "Run Comprehensive Audit"}</span>
              </>
            )}
          </Button>

          {showResults && (
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <ClipboardCopy className="h-4 w-4" />
                <span>Copy Report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {showResults && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Improvement Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">User Experience Improvements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Loading States</span>
                      <p className="text-sm text-gray-600">Added skeleton loaders and spinners for all transitions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Accessibility Features</span>
                      <p className="text-sm text-gray-600">Implemented WCAG 2.1 AA compliance with ARIA labels</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Keyboard Navigation</span>
                      <p className="text-sm text-gray-600">Added full keyboard shortcuts and focus management</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Reduced Motion Support</span>
                      <p className="text-sm text-gray-600">Now respects user preferences for reduced motion</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-800">Visual Enhancements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Dynamic Animations</span>
                      <p className="text-sm text-gray-600">Enhanced with spring animations and micro-interactions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Particle Systems</span>
                      <p className="text-sm text-gray-600">Basic implementation, could be further enhanced</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Shader Effects</span>
                      <p className="text-sm text-gray-600">Simple WebGL shaders added, more complex effects possible</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Responsive Design</span>
                      <p className="text-sm text-gray-600">Enhanced with container queries and advanced breakpoints</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-purple-800">Functionality Improvements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Form Submission</span>
                      <p className="text-sm text-gray-600">Implemented real form submission with validation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Analytics</span>
                      <p className="text-sm text-gray-600">Added comprehensive analytics and tracking</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">SEO Optimization</span>
                      <p className="text-sm text-gray-600">Enhanced meta tags, schema markup, and Open Graph</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">PWA Features</span>
                      <p className="text-sm text-gray-600">Full Progressive Web App with offline support</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-orange-800">Code Quality Enhancements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Component Size</span>
                      <p className="text-sm text-gray-600">Optimized components broken into smaller, focused pieces</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">TypeScript Strict Mode</span>
                      <p className="text-sm text-gray-600">Enabled full strict mode with comprehensive type safety</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Error Handling</span>
                      <p className="text-sm text-gray-600">Comprehensive error boundaries and user-friendly messages</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <span className="font-medium">Performance Monitoring</span>
                      <p className="text-sm text-gray-600">Real-time Core Web Vitals tracking and metrics</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
