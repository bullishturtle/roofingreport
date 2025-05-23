import { ClientSiteAudit } from "@/components/admin/client-site-audit"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Site Audit | RoofFax Admin",
  description: "Comprehensive site audit tool for RoofFax",
}

export default function SiteAuditPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Site Audit</h1>
      <p className="text-gray-600 mb-8">
        Run a comprehensive audit of the application to identify and resolve deployment issues. This tool checks
        environment variables, database connections, API routes, and more.
      </p>

      <ClientSiteAudit />

      <div className="mt-10 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Interpret Results</h2>
          <div className="prose prose-stone max-w-none">
            <p>
              The site audit performs checks across multiple categories and provides a detailed report. Each check has
              one of three possible statuses:
            </p>
            <ul>
              <li>
                <strong className="text-green-600">Pass</strong>: The check was successful with no issues found.
              </li>
              <li>
                <strong className="text-yellow-600">Warning</strong>: Non-critical issues were found that should be
                addressed but won't prevent the application from functioning.
              </li>
              <li>
                <strong className="text-red-600">Fail</strong>: Critical issues were found that need to be fixed for the
                application to function properly.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-4">Categories</h3>
            <ul>
              <li>
                <strong>Environment Variables</strong>: Checks if all required environment variables are present.
              </li>
              <li>
                <strong>Database Connection</strong>: Verifies that the application can connect to the database.
              </li>
              <li>
                <strong>API Routes</strong>: Confirms that critical API routes are properly configured.
              </li>
              <li>
                <strong>Authentication Setup</strong>: Ensures authentication is properly configured.
              </li>
              <li>
                <strong>Audit System</strong>: Verifies that the audit logging system is working correctly.
              </li>
              <li>
                <strong>File System</strong>: Checks that critical files exist and are properly configured.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-4">Common Issues and Solutions</h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Issue</th>
                  <th className="border p-2 text-left">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Missing environment variables</td>
                  <td className="border p-2">Add the missing variables to your Vercel project or .env file.</td>
                </tr>
                <tr>
                  <td className="border p-2">Database connection failure</td>
                  <td className="border p-2">
                    Check that your DATABASE_URL is correct and the database is accessible.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">API route errors</td>
                  <td className="border p-2">Review the specific API route implementation for errors or issues.</td>
                </tr>
                <tr>
                  <td className="border p-2">Authentication issues</td>
                  <td className="border p-2">Verify that NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly.</td>
                </tr>
                <tr>
                  <td className="border p-2">Missing critical files</td>
                  <td className="border p-2">Restore the missing files from your repository or backups.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
