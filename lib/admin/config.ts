export type SupabaseConfig = {
  url: string
  anonKey: string
  serviceRoleKey?: string
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return null
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

export function getSupabaseSetupError() {
  return "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and Vercel."
}
