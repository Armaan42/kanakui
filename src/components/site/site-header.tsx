import Link from "next/link"

import { GitHubIcon, LogoMark } from "@/components/site/icons"
import { MainNav } from "@/components/site/main-nav"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex w-full max-w-[90rem] px-4 sm:px-6 h-14 items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <LogoMark className="size-5" />
          {siteConfig.name}
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
