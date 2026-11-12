"use client"

import { Moon, Sun } from "lucide-react"

import { setMode } from "@/components/site/theme-config"
import { Button } from "@/components/ui/button"

/**
 * Switches between dark and light. The icons swap with CSS (`dark:`), so the
 * button renders identically on the server and client and needs no state.
 * The choice is saved to localStorage and applied before paint by the theme
 * script in the root layout.
 */
export function ThemeToggle() {
  function toggle() {
    setMode(document.documentElement.classList.contains("dark") ? "light" : "dark")
  }

  return (
    <Button type="button" variant="ghost" size="icon" onClick={toggle} aria-label="Switch between dark and light theme">
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="dark:hidden" aria-hidden="true" />
    </Button>
  )
}
