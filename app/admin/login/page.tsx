import { redirect } from "next/navigation"
import { LoginForm } from "@/components/admin/login-form"
import { getCurrentAdmin } from "@/lib/admin/auth"
import { getSupabaseConfig, getSupabaseSetupError } from "@/lib/admin/config"

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin()

  if (admin) {
    redirect("/admin/dashboard")
  }

  const isConfigured = Boolean(getSupabaseConfig())

  return (
    <main className="min-h-screen bg-brand-gradient px-4 py-10 text-primary-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-3xl border border-primary-foreground/15 bg-background p-6 text-foreground shadow-2xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Private Admin</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-primary">Prince Deluxe PG</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Login is required to manage rooms, residents, enquiries and payments.
          </p>

          {!isConfigured ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {getSupabaseSetupError()}
            </div>
          ) : (
            <div className="mt-6">
              <LoginForm />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
