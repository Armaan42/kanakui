import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { supabaseConfig } from "@/lib/supabase/config"

/**
 * A Supabase client for one server request (route handlers and server
 * actions), reading and writing the session cookies. Create a new one per
 * request: @supabase/ssr sends its no-cache headers only with the first write.
 */
export async function getServerSupabase() {
  if (!supabaseConfig) return null
  const cookieStore = await cookies()
  return createServerClient(supabaseConfig.url, supabaseConfig.key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        for (const { name, value, options } of toSet) cookieStore.set(name, value, options)
      },
    },
  })
}
