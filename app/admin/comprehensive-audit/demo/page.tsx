import ComprehensiveAuditDemo from "../page-demo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comprehensive Site Audit Demo | RoofFax Admin",
  description: "Interactive demo of the comprehensive site audit system",
}

export default function ComprehensiveAuditDemoPage() {
  return <ComprehensiveAuditDemo />
}
