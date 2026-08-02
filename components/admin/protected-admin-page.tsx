import { AdminShell } from "@/components/admin/admin-shell"
import { requireAdmin, type AdminUser } from "@/lib/admin/auth"

export async function ProtectedAdminPage({
  children,
  admin: providedAdmin,
}: {
  children: React.ReactNode
  admin?: AdminUser
}) {
  const admin = providedAdmin ?? (await requireAdmin())

  return <AdminShell admin={admin}>{children}</AdminShell>
}
