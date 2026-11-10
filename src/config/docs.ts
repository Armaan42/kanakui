/**
 * Documentation pages in reading order. Drives the sidebar's "Getting
 * started" group, page metadata, and the previous/next links on each page.
 */
export interface DocsPageMeta {
  title: string
  /** Shorter label for the sidebar. */
  navTitle?: string
  href: string
  description: string
}

export const docsPages: DocsPageMeta[] = [
  {
    title: "Introduction",
    href: "/docs",
    description: "What kanakui is, how installing a component works, and what you get.",
  },
  {
    title: "Installation",
    navTitle: "Installation guide",
    href: "/docs/installation",
    description: "Set up a project for kanakui components and install your first one.",
  },
  {
    title: "Install Next.js",
    href: "/docs/installation/nextjs",
    description: "Create a new Next.js app with TypeScript, Tailwind CSS and the App Router.",
  },
  {
    title: "Install Tailwind CSS",
    href: "/docs/installation/tailwind",
    description: "Add Tailwind CSS v4 to an existing Next.js project.",
  },
  {
    title: "Add utilities",
    href: "/docs/installation/utilities",
    description: "Set up shadcn: components.json, theme variables and the cn helper every component uses.",
  },
  {
    title: "CLI and namespace",
    navTitle: "CLI",
    href: "/docs/cli",
    description: "Install, preview, search and update components with the shadcn CLI.",
  },
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
    description: "Fixes for the errors people run into most often.",
  },
]

export function getDocsPage(href: string): DocsPageMeta {
  const page = docsPages.find((p) => p.href === href)
  if (!page) throw new Error(`Unknown docs page: ${href}`)
  return page
}

export function getDocsNeighbours(href: string) {
  const index = docsPages.findIndex((p) => p.href === href)
  return {
    previous: index > 0 ? docsPages[index - 1] : undefined,
    next: index >= 0 && index < docsPages.length - 1 ? docsPages[index + 1] : undefined,
  }
}
