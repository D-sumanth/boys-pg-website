import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSupabaseConfig } from "@/lib/admin/config"

export const ADMIN_ACCESS_TOKEN_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-pdpg_admin_access_token"
    : "pdpg_admin_access_token"

const LEGACY_ADMIN_ACCESS_TOKEN_COOKIE = "pdpg_admin_access_token"
const LEGACY_ADMIN_REFRESH_TOKEN_COOKIE = "pdpg_admin_refresh_token"
const AUTH_REQUEST_TIMEOUT_MS = 15_000

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
  expires_in?: number
  user?: {
    id: string
    email?: string
  }
}

export async function signInWithPassword(email: string, password: string) {
  const config = getSupabaseConfig()

  if (!config) {
    return { ok: false, error: "Supabase is not configured yet." }
  }

  let response: Response

  try {
    response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS),
    })
  } catch {
    return { ok: false, error: "The admin service is temporarily unavailable." }
  }

  const result = (await response.json().catch(() => ({}))) as TokenResponse

  if (response.status === 429) {
    return {
      ok: false,
      error: "Too many login attempts. Wait a few minutes and try again.",
    }
  }

  if (!response.ok || !result.access_token) {
    return {
      ok: false,
      error: "Invalid email or password.",
    }
  }

  const cookieStore = await cookies()
  const maxAge = result.expires_in ?? 60 * 60

  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, result.access_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: Math.min(maxAge, 60 * 60),
    priority: "high",
  })

  if (ADMIN_ACCESS_TOKEN_COOKIE !== LEGACY_ADMIN_ACCESS_TOKEN_COOKIE) {
    cookieStore.delete(LEGACY_ADMIN_ACCESS_TOKEN_COOKIE)
  }
  cookieStore.delete(LEGACY_ADMIN_REFRESH_TOKEN_COOKIE)

  return { ok: true }
}

export async function signOutAdmin() {
  const config = getSupabaseConfig()
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value

  if (config && accessToken) {
    await fetch(`${config.url}/auth/v1/logout?scope=local`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS),
    }).catch(() => null)
  }

  cookieStore.delete(ADMIN_ACCESS_TOKEN_COOKIE)
  cookieStore.delete(LEGACY_ADMIN_ACCESS_TOKEN_COOKIE)
  cookieStore.delete(LEGACY_ADMIN_REFRESH_TOKEN_COOKIE)
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
    signal: AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS),
  }).catch(() => null)

  if (!response?.ok) {
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
  const profileQuery = new URLSearchParams({
    id: `eq.${authUser.id}`,
    is_active: "eq.true",
    select: "id,full_name,role,is_active",
  })
  const response = await fetch(
    `${config.url}/rest/v1/profiles?${profileQuery.toString()}`,
    {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS),
    },
  ).catch(() => null)

  if (!response?.ok) {
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

export function canEditAdmin(admin: AdminUser) {
  return admin.role === "Owner" || admin.role === "Manager"
}

export async function requireAdminEditor() {
  const admin = await requireAdmin()

  if (!canEditAdmin(admin)) {
    redirect("/admin/dashboard?error=read-only")
  }

  return admin
}
