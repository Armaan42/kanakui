"use client"

import * as React from "react"

import { PACKAGE_MANAGERS, type PackageManager } from "@/lib/package-manager"

const STORAGE_KEY = "package-manager"
const listeners = new Set<() => void>()
let current: PackageManager | null = null

function read(): PackageManager {
  if (current) return current
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    current = PACKAGE_MANAGERS.includes(stored as PackageManager) ? (stored as PackageManager) : "npm"
  } catch {
    current = "npm"
  }
  return current
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Another tab changed it.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    current = null
    listener()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

/**
 * The reader's package manager, shared by every command block on the page and
 * remembered in this browser. The server always renders npm.
 */
export function usePackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const pm = React.useSyncExternalStore(subscribe, read, () => "npm" as const)
  const setPm = React.useCallback((next: PackageManager) => {
    current = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: still switch for this page view.
    }
    for (const listener of listeners) listener()
  }, [])
  return [pm, setPm]
}
