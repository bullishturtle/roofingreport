import { runFullAudit } from "./site-audit"
import { printTestChecklist } from "./manual-test-checklist"

async function main() {
  console.log("🔍 RoofFax Platform Comprehensive Audit")
  console.log("=======================================\n")

  // Run automated audit
  console.log("Running automated tests...\n")
  const auditResults = await runFullAudit()

  console.log("\n" + "=".repeat(50))

  // Print manual testing checklist
  console.log("\nManual testing checklist:")
  printTestChecklist()

  // Summary
  console.log("🎯 AUDIT COMPLETE")
  console.log("=================")
  console.log(`Overall Success Rate: ${auditResults.successRate.toFixed(1)}%`)

  if (auditResults.successRate >= 95) {
    console.log("✅ Excellent! Your RoofFax platform is ready for production.")
  } else if (auditResults.successRate >= 85) {
    console.log("⚠️  Good, but some issues need attention before full launch.")
  } else {
    console.log("❌ Critical issues found. Please address before going live.")
  }
}

main().catch(console.error)
