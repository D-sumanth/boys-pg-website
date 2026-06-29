import { ProtectedAdminPage } from "@/components/admin/protected-admin-page"

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <ProtectedAdminPage>
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Coming Soon</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </ProtectedAdminPage>
  )
}
