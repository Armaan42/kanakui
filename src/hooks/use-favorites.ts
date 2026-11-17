"use client"

import * as React from "react"

import { useSession } from "@/hooks/use-session"
import { getBrowserSupabase } from "@/lib/supabase/client"

type Favorites = { status: "idle" | "loading" | "ready" | "error"; names: Set<string>; userId: string | null }

/*
 * The signed-in user's favourites, loaded once per tab and shared by every
 * heart button. Rows live in the `favorites` table; its Row Level Security
 * policies only let someone see, add or remove their own.
 */
let state: Favorites = { status: "idle", names: new Set(), userId: null }
const listeners = new Set<() => void>()
const SERVER: Favorites = state

function set(next: Partial<Favorites>) {
  state = { ...state, ...next }
  for (const listener of listeners) listener()
}

async function load(userId: string) {
  if (state.userId === userId && state.status !== "idle") return
  set({ status: "loading", userId, names: new Set() })
  const supabase = getBrowserSupabase()
  const { data, error } = (await supabase?.from("favorites").select("item_name")) ?? { data: null, error: true }
  if (state.userId !== userId) return
  if (error || !data) return set({ status: "error" })
  set({ status: "ready", names: new Set(data.map((row: { item_name: string }) => row.item_name)) })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useFavorites() {
  const session = useSession()
  const favorites = React.useSyncExternalStore(subscribe, () => state, () => SERVER)
  const userId = session.status === "signed-in" ? session.user.id : null

  React.useEffect(() => {
    if (userId) void load(userId)
    else if (state.userId) set({ status: "idle", names: new Set(), userId: null })
  }, [userId])

  /** Adds or removes `name`. Updates at once and rolls back if the database says no. */
  const toggle = React.useCallback(async (name: string): Promise<boolean> => {
    const supabase = getBrowserSupabase()
    if (!supabase || !state.userId) return false
    const had = state.names.has(name)
    const optimistic = new Set(state.names)
    if (had) optimistic.delete(name)
    else optimistic.add(name)
    set({ names: optimistic })
    const { error } = had
      ? await supabase.from("favorites").delete().eq("item_name", name)
      : await supabase.from("favorites").insert({ item_name: name })
    if (error) {
      const reverted = new Set(state.names)
      if (had) reverted.add(name)
      else reverted.delete(name)
      set({ names: reverted })
      return false
    }
    return true
  }, [])

  return { ...favorites, signedIn: Boolean(userId), sessionStatus: session.status, toggle }
}
