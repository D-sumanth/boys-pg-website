import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSupabaseConfig } from "@/lib/admin/config"

export const ADMIN_ACCESS_TOKEN_COOKIE = "pdpg_admin_access_token"
export const ADMIN_REFRESH_TOKEN_COOKIE = "pdpg_admin_refresh_token"

export type AdminRole = "Owner" | "Manager" | "Viewer"

export type AdminUser = {
  id: string
  email: string
  fullName: string
  role: AdminRole
}

type AuthUserResponse = {
  id: string
  email?: string
}

type ProfileRow = {
  id: string
  full_name: string | null
  role: AdminRole
  is_active: boolean
}

type TokenResponse = {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  user?: {
    id: string
    email?: string
  }
  error_description?: string
  msg?: string
}

export async function signInWithPassword(email: string, password: string) {
  const config = getSupabaseConfig()

  if (!config) {
    return { ok: false, error: "Supabase is not configured yet." }
  }

  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  })

  const result = (await response.json().catch(() => ({}))) as TokenResponse

  if (!response.ok || !result.access_token || !result.refresh_token) {
    return {
      ok: false,
      error: result.error_description || result.msg || "Invalid email or password.",
    }
  }

  const cookieStore = await cookies()
  const maxAge = result.expires_in ?? 60 * 60

  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, result.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  })
  cookieStore.set(ADMIN_REFRESH_TOKEN_COOKIE, result.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  return { ok: true }
}

export async function signOutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_ACCESS_TOKEN_COOKIE)
  cookieStore.delete(ADMIN_REFRESH_TOKEN_COOKIE)
}

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value
}

export async function getCurrentAuthUser(): Promise<AuthUserResponse | null> {
  const config = getSupabaseConfig()
  const token = await getAccessToken()

  if (!config || !token) {
    return null
  }

  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    return null
  }

  return (await response.json()) as AuthUserResponse
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const config = getSupabaseConfig()
  const authUser = await getCurrentAuthUser()

  if (!config || !authUser) {
    return null
  }

  const token = await getAccessToken()
  const response = await fetch(
    `${config.url}/rest/v1/profiles?id=eq.${authUser.id}&is_active=eq.true&select=id,full_name,role,is_active`,
    {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  )

  if (!response.ok) {
    return null
  }

  const profiles = (await response.json()) as ProfileRow[]
  const profile = profiles[0]

  if (!profile) {
    return null
  }

  return {
    id: authUser.id,
    email: authUser.email ?? "",
    fullName: profile.full_name || authUser.email || "Admin",
    role: profile.role,
  }
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  return admin
}
