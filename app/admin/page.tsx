import { DatabaseInitializer } from "@/components/admin/db-initializer"
import { BackupManager } from "@/components/admin/backup-manager"
import { BackupTester } from "@/components/admin/backup-tester"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Database Management</h2>
          <DatabaseInitializer />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Backup System Test</h2>
          <BackupTester />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Backup Management</h2>
          <BackupManager />
        </div>
      </div>
    </div>
  )
}
