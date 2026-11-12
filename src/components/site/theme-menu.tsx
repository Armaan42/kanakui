"use client"

import Link from "next/link"
import { Palette } from "lucide-react"

import { ThemeCustomizer } from "@/components/site/theme-customizer"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/** The header's theme button: opens the theme customizer in a popover. */
export function ThemeMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Customize theme">
          <Palette aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-4">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-sm font-medium">Theme</p>
          <Link href="/themes" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Theme page
          </Link>
        </div>
        <ThemeCustomizer />
      </PopoverContent>
    </Popover>
  )
}
