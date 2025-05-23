import { Suspense } from "react"
import { AuditLogViewer } from "@/components/admin/audit-log-viewer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequireAdmin } from "@/components/auth/require-admin"

export const metadata = {
  title: "Audit Logs | RoofFax Admin",
  description: "View and search audit logs for system activities",
}

export default function AuditLogsPage() {
  return (
    <RequireAdmin>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>About Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Audit logs track user actions, data modifications, and system events. Use the filters to search for
                specific activities. Logs are retained for 90 days by default.
              </p>
            </CardContent>
          </Card>
        </div>

        <Suspense fallback={<div>Loading audit logs...</div>}>
          <AuditLogViewer />
        </Suspense>
      </div>
    </RequireAdmin>
  )
}
