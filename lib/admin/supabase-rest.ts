import { getAccessToken } from "@/lib/admin/auth"
import { getSupabaseConfig } from "@/lib/admin/config"

type QueryValue = string | number | boolean | null | undefined

export type SupabaseResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

function buildQuery(params?: Record<string, QueryValue>) {
  if (!params) {
    return ""
  }

  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value))
    }
  }

  const search = query.toString()
  return search ? `?${search}` : ""
}

export async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
  options: { useServiceRole?: boolean } = {},
): Promise<SupabaseResult<T>> {
  const config = getSupabaseConfig()

  if (!config) {
    return { data: null, error: "Supabase is not configured." }
  }

  const accessToken = await getAccessToken()
  const key = options.useServiceRole && config.serviceRoleKey ? config.serviceRoleKey : config.anonKey
  const authorization = options.useServiceRole && config.serviceRoleKey ? config.serviceRoleKey : accessToken

  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      apikey: key,
      ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    return { data: null, error: text || response.statusText }
  }

  if (response.status === 204) {
    return { data: null as T, error: null }
  }

  return { data: (await response.json()) as T, error: null }
}

export async function selectRows<T>(table: string, params?: Record<string, QueryValue>) {
  return supabaseRequest<T[]>(`/rest/v1/${table}${buildQuery(params)}`)
}

export async function insertRow<T>(table: string, body: Record<string, unknown>) {
  return supabaseRequest<T[]>(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function insertRows<T>(table: string, body: Record<string, unknown>[]) {
  return supabaseRequest<T[]>(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function updateRows<T>(table: string, filter: string, body: Record<string, unknown>) {
  return supabaseRequest<T[]>(`/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}
