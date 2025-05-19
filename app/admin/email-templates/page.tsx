import { EmailTemplatePreview } from "@/components/admin/email-template-preview"

export const metadata = {
  title: "Email Templates | RoofFax Admin",
  description: "Preview and test email templates",
}

export default function EmailTemplatesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Email Template Testing</h1>
      <p className="text-gray-500 mb-8">
        Preview and test all email templates to ensure they render correctly across different email clients.
      </p>

      <EmailTemplatePreview />
    </div>
  )
}
