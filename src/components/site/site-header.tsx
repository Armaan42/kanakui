import Link from "next/link"

import { GitHubIcon, LogoMark } from "@/components/site/icons"
import { MainNav } from "@/components/site/main-nav"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <LogoMark className="size-5" />
          {/* Visually hidden on phones so the nav fits; still the link's accessible name. */}
          <span className="max-sm:sr-only">{siteConfig.name}</span>
        </Link>
        <MainNav items={siteConfig.nav} />
        <div className="ml-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="icon">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
              <GitHubIcon />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
