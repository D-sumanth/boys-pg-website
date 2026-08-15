import { getAccessToken } from "@/lib/admin/auth"
import { getSupabaseConfig } from "@/lib/admin/config"

type QueryValue = string | number | boolean | null | undefined

export type AdminTable =
  | "profiles"
  | "hostels"
  | "room_types"
  | "rooms"
  | "beds"
  | "residents"
  | "resident_occupancy"
  | "rent_invoices"
  | "payments"
  | "deposits"
  | "expense_categories"
  | "expenses"
  | "enquiries"
  | "activity_logs"

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
): Promise<SupabaseResult<T>> {
  const config = getSupabaseConfig()

  if (!config) {
    return { data: null, error: "Supabase is not configured." }
  }

  const accessToken = await getAccessToken()

  if (!accessToken) {
    return { data: null, error: "Authentication is required." }
  }

  let response: Response

  try {
    response = await fetch(`${config.url}${path}`, {
      ...init,
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...init.headers,
      },
      cache: "no-store",
      signal: init.signal ?? AbortSignal.timeout(15_000),
    })
  } catch {
    return { data: null, error: "The database request timed out or could not be reached." }
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    return { data: null, error: text || response.statusText }
  }

  if (response.status === 204) {
    return { data: null as T, error: null }
  }

  return { data: (await response.json()) as T, error: null }
}

export async function selectRows<T>(table: AdminTable, params?: Record<string, QueryValue>) {
  return supabaseRequest<T[]>(`/rest/v1/${table}${buildQuery(params)}`)
}

export async function insertRow<T>(table: AdminTable, body: Record<string, unknown>) {
  return supabaseRequest<T[]>(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function insertRows<T>(table: AdminTable, body: Record<string, unknown>[]) {
  return supabaseRequest<T[]>(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function updateRows<T>(
  table: AdminTable,
  filters: Record<string, QueryValue>,
  body: Record<string, unknown>,
) {
  return supabaseRequest<T[]>(`/rest/v1/${table}${buildQuery(filters)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}
