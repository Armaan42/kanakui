"use client"

import * as React from "react"
import type { Session } from "@supabase/supabase-js"

import { getBrowserSupabase } from "@/lib/supabase/client"

export interface SessionUser {
  id: string
  email: string | null
  name: string | null
  avatarUrl: string | null
}

export type SessionState =
  | { status: "loading" }
  | { status: "disabled" }
  | { status: "signed-out" }
  | { status: "signed-in"; user: SessionUser }

/*
 * One store for the whole tab. The header and buttons only use this to decide
 * what to show; anything that reads or writes data goes through Supabase with
 * the user's token, where Row Level Security does the real checking.
 */
const SERVER: SessionState = { status: "loading" }
let state: SessionState = SERVER
let started = false
const listeners = new Set<() => void>()

function set(next: SessionState) {
  state = next
  for (const listener of listeners) listener()
}

function fromSession(session: Session | null): SessionState {
  if (!session) return { status: "signed-out" }
  const meta = session.user.user_metadata ?? {}
  return {
    status: "signed-in",
    user: {
      id: session.user.id,
      email: session.user.email ?? null,
      name: (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? null,
      avatarUrl: (meta.avatar_url as string | undefined) ?? (meta.picture as string | undefined) ?? null,
    },
  }
}

function start() {
  if (started) return
  started = true
  const supabase = getBrowserSupabase()
  if (!supabase) return set({ status: "disabled" })
  supabase.auth.getSession().then(({ data }) => set(fromSession(data.session)))
  // Sign-in and sign-out in this tab or another one.
  supabase.auth.onAuthStateChange((_event, session) => set(fromSession(session)))
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  start()
  return () => listeners.delete(listener)
}

export function useSession(): SessionState {
  return React.useSyncExternalStore(subscribe, () => state, () => SERVER)
}

export async function signOut() {
  await getBrowserSupabase()?.auth.signOut()
}
