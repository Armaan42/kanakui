import Link from "next/link"

import { UserMenu } from "@/components/site/account/user-menu"
import { CommandMenu, type SearchGroup } from "@/components/site/command-menu"
import { GitHubIcon, LogoMark } from "@/components/site/icons"
import { MainNav } from "@/components/site/main-nav"
import { MobileNav } from "@/components/site/mobile-nav"
import { ThemeMenu } from "@/components/site/theme-menu"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Button } from "@/components/ui/button"
import { docsPages } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { getCategoryTitle, getItems, type ItemKind } from "@/lib/registry"

/** Everything the command menu can open, built at render time on the server. */
function searchGroups(): SearchGroup[] {
  const items = (kind: ItemKind) =>
    getItems(kind).map((item) => ({
      title: item.title,
      href: item.href,
      hint: kind === "templates" ? undefined : getCategoryTitle(item.categories[0] ?? ""),
      keywords: [item.name, ...item.categories.map(getCategoryTitle)],
    }))

  return [
    {
      id: "pages",
      heading: "Pages",
      links: [
        { title: "Home", href: "/" },
        { title: "All components", href: "/components" },
        { title: "All blocks", href: "/blocks" },
        { title: "All templates", href: "/templates" },
        { title: "Themes", href: "/themes", keywords: ["colors", "customize", "dark mode"] },
      ],
    },
    {
      id: "installation",
      heading: "Installation",
      links: docsPages.map((page) => ({ title: page.navTitle ?? page.title, href: page.href })),
    },
    { id: "templates", heading: "Templates", links: items("templates") },
    { id: "components", heading: "Components", links: items("components") },
    { id: "blocks", heading: "Blocks", links: items("blocks") },
  ]
}

/** The menu panel's links: every main section (with live counts) and the setup guides. */
function mobileLinks() {
  const counts: Record<string, number> = {
    "/components": getItems("components").length,
    "/blocks": getItems("blocks").length,
    "/templates": getItems("templates").length,
  }
  const primary = siteConfig.nav.map((item) => ({ ...item, count: counts[item.href] }))
  const guides = docsPages.map((page) => ({ title: page.navTitle ?? page.title, href: page.href }))
  return { primary, guides }
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center gap-2 px-4 sm:px-6 md:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <LogoMark className="size-5" />
          {siteConfig.name}
        </Link>
        <MainNav items={siteConfig.nav} className="max-md:hidden" />
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <CommandMenu groups={searchGroups()} />
          {/* On phones GitHub is in the menu panel. */}
          <Button asChild variant="ghost" size="icon" className="max-sm:hidden">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
              <GitHubIcon />
            </a>
          </Button>
          {/* Below 360px there isn't room; Themes is in the menu panel. */}
          <ThemeMenu className="max-[359px]:hidden" />
          <ThemeToggle />
          {/* On phones, signing in lives in the menu panel. */}
          <UserMenu className="ml-1 max-sm:hidden" />
          <Button asChild size="sm" className="ml-2 max-xl:hidden">
            <Link href="/docs/installation">Get started</Link>
          </Button>
          <MobileNav siteName={siteConfig.name} github={siteConfig.links.github} {...mobileLinks()} className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
