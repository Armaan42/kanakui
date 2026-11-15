import Link from "next/link"

import { CommandMenu, type SearchGroup } from "@/components/site/command-menu"
import { GitHubIcon, LogoMark } from "@/components/site/icons"
import { MainNav } from "@/components/site/main-nav"
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center gap-2 px-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <LogoMark className="size-5" />
          {/* Visually hidden on phones so the nav fits; still the link's accessible name. */}
          <span className="max-sm:sr-only">{siteConfig.name}</span>
        </Link>
        <MainNav items={siteConfig.nav} />
        <div className="ml-auto flex items-center sm:gap-1">
          <CommandMenu groups={searchGroups()} />
          {/* Hidden on phones to make room; the footer links to GitHub too. */}
          <Button asChild variant="ghost" size="icon" className="max-sm:hidden">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
              <GitHubIcon />
            </a>
          </Button>
          {/* Below 360px there isn't room; the Themes page is in the search menu. */}
          <ThemeMenu className="max-[359px]:hidden" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
