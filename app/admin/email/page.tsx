import { EmailConfigStatus } from "@/components/admin/email-config-status"

export const metadata = {
  title: "Email Configuration - RoofFax Admin",
  description: "Configure and manage email settings for RoofFax",
}

export default function EmailConfigPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Email Configuration</h1>
      <div className="grid gap-6">
        <EmailConfigStatus />
      </div>
    </div>
  )
}
