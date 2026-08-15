export type SupabaseConfig = {
  url: string
  anonKey: string
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return null
  }

  try {
    const parsedUrl = new URL(url)
    const isSecureRemote = parsedUrl.protocol === "https:"
    const isLocalDevelopment =
      process.env.NODE_ENV !== "production" &&
      parsedUrl.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(parsedUrl.hostname)

    if (!isSecureRemote && !isLocalDevelopment) {
      return null
    }

    return {
      url: parsedUrl.origin,
      anonKey,
    }
  } catch {
    return null
  }
}

export function getSupabaseSetupError() {
  return "The private admin service is temporarily unavailable."
}
