"use client"

import * as React from "react"

import { DEFAULT_THEME, parseThemeConfig, THEME_CONFIG_STORAGE_KEY, type ThemeConfig } from "@/config/themes"
import { THEME_STORAGE_KEY } from "@/lib/theme"

export type Mode = "light" | "dark"

export interface ThemeState extends ThemeConfig {
  mode: Mode
}

/** Fired on window when this page changes the theme, so every picker on the page stays in step. */
const CHANGE_EVENT = "kanakui-theme-change"

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable (private mode, blocked): the change still applies to this page view.
  }
}

function applyConfig(config: ThemeConfig) {
  const root = document.documentElement
  root.dataset.base = config.base
  root.dataset.accent = config.accent
  root.dataset.radius = config.radius
}

// The <html> element is the source of truth: the head script sets it before
// paint, and every change below writes to it. Snapshots are cached by value so
// useSyncExternalStore sees a stable object between changes.
let cachedKey = ""
let cachedState: ThemeState = { ...DEFAULT_THEME, mode: "dark" }

function readState(): ThemeState {
  const root = document.documentElement
  const config = parseThemeConfig({ base: root.dataset.base, accent: root.dataset.accent, radius: root.dataset.radius })
  const mode: Mode = root.classList.contains("dark") ? "dark" : "light"
  const key = `${config.base}|${config.accent}|${config.radius}|${mode}`
  if (key !== cachedKey) {
    cachedKey = key
    cachedState = { ...config, mode }
  }
  return cachedState
}

const serverState: ThemeState = { ...DEFAULT_THEME, mode: "dark" }

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** Sets light or dark for the whole site and remembers it. */
export function setMode(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark")
  save(THEME_STORAGE_KEY, mode)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Changes the base color, accent or radius for the whole site and remembers it. */
export function setThemeConfig(next: Partial<ThemeConfig>) {
  const current = readState()
  const config = parseThemeConfig({ base: current.base, accent: current.accent, radius: current.radius, ...next })
  applyConfig(config)
  save(THEME_CONFIG_STORAGE_KEY, JSON.stringify(config))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** The current theme (base color, accent, radius and mode), updated live. */
export function useThemeState(): ThemeState {
  return React.useSyncExternalStore(subscribe, readState, () => serverState)
}

/**
 * Keeps this document in step when the theme changes in another one: other
 * tabs, and the preview iframes on component pages (same origin, so they get
 * `storage` events when the page changes the theme). Pages opened with
 * ?theme=light|dark keep the mode they were asked for.
 */
export function ThemeSync() {
  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_CONFIG_STORAGE_KEY) {
        let value: unknown = {}
        try {
          value = JSON.parse(event.newValue ?? "{}")
        } catch {
          // Ignore malformed values; the defaults apply.
        }
        applyConfig(parseThemeConfig(value))
      }
      if (event.key === THEME_STORAGE_KEY && !new URLSearchParams(location.search).has("theme")) {
        document.documentElement.classList.toggle("dark", event.newValue !== "light")
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  return null
}
