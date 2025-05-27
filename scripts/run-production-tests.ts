import { ProductionTester } from "./production-test-suite"
import { generateManualTestReport } from "./manual-testing-checklist"

async function runProductionTests() {
  console.log("🚀 Starting RoofFax Production Testing Suite...\n")

  const tester = new ProductionTester()

  try {
    // Run automated tests
    console.log("🤖 Running Automated Tests...")
    const results = await tester.runFullTestSuite()

    // Generate and display report
    const report = tester.generateReport()
    console.log(report)

    // Generate manual testing checklist
    console.log("\n📋 Manual Testing Checklist:")
    const manualReport = generateManualTestReport()
    console.log(manualReport)

    // Summary
    const passed = results.filter((r) => r.status === "PASS").length
    const total = results.length
    const successRate = Math.round((passed / total) * 100)

    console.log(`\n🎯 FINAL RESULT: ${successRate}% Success Rate`)

    if (successRate >= 90) {
      console.log("🟢 EXCELLENT: Your RoofFax platform is ready for production!")
    } else if (successRate >= 80) {
      console.log("🟡 GOOD: Platform is functional with minor issues to address.")
    } else {
      console.log("🔴 ATTENTION NEEDED: Several critical issues require fixing.")
    }
  } catch (error) {
    console.error("❌ Testing suite failed:", error)
  }
}

// Run the tests
runProductionTests()
