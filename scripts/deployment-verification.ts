/**
 * Deployment Verification Script
 * Ensures all functionality works after deployment
 */

interface VerificationResult {
  test: string
  status: "PASS" | "FAIL"
  details: string
}

export class DeploymentVerifier {
  private results: VerificationResult[] = []
  private baseUrl: string

  constructor(baseUrl = "https://therooffax.com") {
    this.baseUrl = baseUrl
  }

  async verifyDeployment(): Promise<VerificationResult[]> {
    console.log("🔍 Starting deployment verification...")

    await this.verifyHomepage()
    await this.verifyDemoPages()
    await this.verifyAPIEndpoints()
    await this.verifyAuthentication()
    await this.verifyPerformance()
    await this.verifySEO()

    return this.results
  }

  private async verifyHomepage() {
    try {
      const response = await fetch(this.baseUrl)
      const html = await response.text()

      const checks = [
        { name: "Homepage loads", condition: response.ok },
        { name: "RoofFax branding present", condition: html.includes("RoofFax") },
        { name: "Hero search present", condition: html.includes("property search") || html.includes("search") },
        { name: "Demo tools section", condition: html.includes("demo") },
      ]

      checks.forEach((check) => {
        this.addResult("Homepage", check.condition ? "PASS" : "FAIL", check.name)
      })
    } catch (error) {
      this.addResult("Homepage", "FAIL", `Error: ${error}`)
    }
  }

  private async verifyDemoPages() {
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
        const response = await fetch(`${this.baseUrl}${page}`)
        this.addResult(`Demo Page: ${page}`, response.ok ? "PASS" : "FAIL", `Status: ${response.status}`)
      } catch (error) {
        this.addResult(`Demo Page: ${page}`, "FAIL", `Error: ${error}`)
      }
    }
  }

  private async verifyAPIEndpoints() {
    const endpoints = ["/api/health", "/api/auth/session", "/api/properties"]

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`)
        this.addResult(`API: ${endpoint}`, response.status < 500 ? "PASS" : "FAIL", `Status: ${response.status}`)
      } catch (error) {
        this.addResult(`API: ${endpoint}`, "FAIL", `Error: ${error}`)
      }
    }
  }

  private async verifyAuthentication() {
    try {
      const response = await fetch(`${this.baseUrl}/login`)
      this.addResult("Authentication", response.ok ? "PASS" : "FAIL", `Login page status: ${response.status}`)
    } catch (error) {
      this.addResult("Authentication", "FAIL", `Error: ${error}`)
    }
  }

  private async verifyPerformance() {
    try {
      const start = Date.now()
      const response = await fetch(this.baseUrl)
      const loadTime = Date.now() - start

      this.addResult("Performance", loadTime < 3000 ? "PASS" : "FAIL", `Load time: ${loadTime}ms`)
    } catch (error) {
      this.addResult("Performance", "FAIL", `Error: ${error}`)
    }
  }

  private async verifySEO() {
    try {
      const response = await fetch(`${this.baseUrl}/sitemap.xml`)
      this.addResult("SEO", response.ok ? "PASS" : "FAIL", `Sitemap status: ${response.status}`)
    } catch (error) {
      this.addResult("SEO", "FAIL", `Error: ${error}`)
    }
  }

  private addResult(test: string, status: "PASS" | "FAIL", details: string) {
    this.results.push({ test, status, details })
    console.log(`${status === "PASS" ? "✅" : "❌"} ${test}: ${details}`)
  }

  generateReport(): string {
    const passed = this.results.filter((r) => r.status === "PASS").length
    const total = this.results.length
    const percentage = Math.round((passed / total) * 100)

    return `
# Deployment Verification Report

## Summary
- **Total Tests**: ${total}
- **Passed**: ${passed}
- **Failed**: ${total - passed}
- **Success Rate**: ${percentage}%

## Detailed Results
${this.results.map((r) => `- ${r.status === "PASS" ? "✅" : "❌"} **${r.test}**: ${r.details}`).join("\n")}

## Status
${percentage >= 90 ? "🎉 **DEPLOYMENT SUCCESSFUL**" : "⚠️ **DEPLOYMENT NEEDS ATTENTION**"}
    `
  }
}

// Usage example
export async function runDeploymentVerification() {
  const verifier = new DeploymentVerifier()
  const results = await verifier.verifyDeployment()
  const report = verifier.generateReport()

  console.log(report)
  return { results, report }
}
