#!/usr/bin/env node

/**
 * Post-deployment testing script for RoofFax landing page
 * This script tests key functionality after deployment
 */

interface TestResult {
  name: string
  status: "PASS" | "FAIL" | "SKIP"
  message: string
}

const BASE_URL = process.env.DEPLOYMENT_URL || "https://therooffax.com"

async function runTests(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test 1: Homepage loads
  try {
    const response = await fetch(BASE_URL)
    if (response.ok) {
      results.push({
        name: "Homepage Load",
        status: "PASS",
        message: `Homepage loaded successfully (${response.status})`,
      })
    } else {
      results.push({
        name: "Homepage Load",
        status: "FAIL",
        message: `Homepage failed to load (${response.status})`,
      })
    }
  } catch (error) {
    results.push({
      name: "Homepage Load",
      status: "FAIL",
      message: `Homepage load error: ${error}`,
    })
  }

  // Test 2: API routes
  const apiRoutes = ["/api/health", "/api/analytics"]

  for (const route of apiRoutes) {
    try {
      const response = await fetch(`${BASE_URL}${route}`)
      results.push({
        name: `API Route ${route}`,
        status: response.ok ? "PASS" : "FAIL",
        message: `Status: ${response.status}`,
      })
    } catch (error) {
      results.push({
        name: `API Route ${route}`,
        status: "FAIL",
        message: `Error: ${error}`,
      })
    }
  }

  // Test 3: Demo pages
  const demoPages = [
    "/demo/measurements",
    "/demo/storm-timeline",
    "/demo/ai-report",
    "/demo/contractor-check",
    "/demo/property-history",
    "/demo/damage-assessment",
  ]

  for (const page of demoPages) {
    try {
      const response = await fetch(`${BASE_URL}${page}`)
      results.push({
        name: `Demo Page ${page}`,
        status: response.ok ? "PASS" : "FAIL",
        message: `Status: ${response.status}`,
      })
    } catch (error) {
      results.push({
        name: `Demo Page ${page}`,
        status: "FAIL",
        message: `Error: ${error}`,
      })
    }
  }

  return results
}

async function main() {
  console.log("🚀 Running post-deployment tests...\n")

  const results = await runTests()

  const passed = results.filter((r) => r.status === "PASS").length
  const failed = results.filter((r) => r.status === "FAIL").length
  const skipped = results.filter((r) => r.status === "SKIP").length

  console.log("📊 Test Results:")
  console.log("================")

  results.forEach((result) => {
    const emoji = result.status === "PASS" ? "✅" : result.status === "FAIL" ? "❌" : "⏭️"
    console.log(`${emoji} ${result.name}: ${result.message}`)
  })

  console.log("\n📈 Summary:")
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⏭️ Skipped: ${skipped}`)
  console.log(`📊 Total: ${results.length}`)

  if (failed === 0) {
    console.log("\n🎉 All tests passed! Deployment successful!")
    process.exit(0)
  } else {
    console.log("\n⚠️ Some tests failed. Please check the issues above.")
    process.exit(1)
  }
}

main().catch(console.error)
