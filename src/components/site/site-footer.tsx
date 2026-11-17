import Link from "next/link"

import { GitHubIcon, LogoMark } from "@/components/site/icons"
import { siteConfig } from "@/config/site"
import { getCategory } from "@/lib/registry"

const linkClass =
  "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

interface FooterLink {
  title: string
  href: string
  external?: boolean
}

/** Category pages worth a shortcut. Only those that exist and have items are shown. */
const POPULAR = [
  { kind: "components", slug: "buttons" },
  { kind: "components", slug: "backgrounds" },
  { kind: "components", slug: "3d" },
  { kind: "blocks", slug: "hero" },
  { kind: "blocks", slug: "pricing" },
] as const

/** The site footer. It links only to pages that exist; add About, Pricing or legal pages here once they do. */
export function SiteFooter() {
  const github = siteConfig.links.github

  const popular: FooterLink[] = POPULAR.flatMap(({ kind, slug }) => {
    const category = getCategory(kind, slug)
    return category && category.count > 0 ? [{ title: category.title, href: `/${kind}/category/${slug}` }] : []
  })

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { title: "Components", href: "/components" },
        { title: "Blocks", href: "/blocks" },
        { title: "Templates", href: "/templates" },
        { title: "Themes", href: "/themes" },
      ],
    },
    { title: "Popular", links: popular },
    {
      title: "Resources",
      links: [
        { title: "Documentation", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
        { title: "CLI", href: "/docs/cli" },
        { title: "AI assistants (MCP)", href: "/docs/mcp" },
        { title: "Troubleshooting", href: "/docs/troubleshooting" },
        { title: "Changelog", href: "/docs/changelog" },
        { title: "Registry index", href: `${siteConfig.registry.basePath}/registry.json`, external: true },
      ],
    },
    {
      title: "Project",
      links: [
        { title: "GitHub", href: github, external: true },
        { title: "Report an issue", href: `${github}/issues`, external: true },
        { title: `${siteConfig.license.name} License`, href: siteConfig.license.url, external: true },
      ],
    },
  ]

  return (
    <footer className="border-t">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pt-14 pb-10 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        <div className="max-w-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <LogoMark className="size-5" />
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm text-pretty text-muted-foreground">
            React components, website blocks and templates in the open shadcn registry format. Copy the command, own the
            code.
          </p>
          <a href={github} target="_blank" rel="noreferrer" aria-label="Source code on GitHub" className={`${linkClass} mt-5 inline-flex`}>
            <GitHubIcon className="size-5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-medium">{column.title}</h2>
              <ul className="mt-4 grid gap-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className={linkClass}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t">
        <p className="mx-auto w-full max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          Everything here is free under the{" "}
          <a href={siteConfig.license.url} target="_blank" rel="noreferrer" className={`${linkClass} underline underline-offset-4`}>
            {siteConfig.license.name} license
          </a>
          . Photos in demos are from Unsplash.
        </p>
      </div>
    </footer>
  )
}
