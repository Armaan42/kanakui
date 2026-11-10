import Link from "next/link"

import { siteConfig } from "@/config/site"

const linkClass =
  "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="page-container flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          {siteConfig.name}: components in the open shadcn registry format. Free components are{" "}
          <a href={siteConfig.license.url} target="_blank" rel="noreferrer" className={linkClass + " underline underline-offset-4"}>
            {siteConfig.license.name} licensed
          </a>
          .
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/components" className={linkClass}>
            Components
          </Link>
          <a href={`${siteConfig.registry.basePath}/registry.json`} className={linkClass}>
            Registry index
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className={linkClass}>
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
