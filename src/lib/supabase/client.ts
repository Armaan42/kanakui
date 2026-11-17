"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

import { supabaseConfig } from "@/lib/supabase/config"

let client: SupabaseClient | null = null

/** The browser's Supabase client (one per tab). `null` when accounts aren't configured. */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!supabaseConfig) return null
  client ??= createBrowserClient(supabaseConfig.url, supabaseConfig.key)
  return client
}
