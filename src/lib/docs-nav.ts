import { docsPages } from "@/config/docs"
import { getItems } from "@/lib/registry"

export interface NavLink {
  title: string
  href: string
}

export interface NavGroup {
  id: "installation" | "components" | "blocks"
  title: string
  links: NavLink[]
}

/** The sidebar: getting-started guides, then every component and block. Server-side only. */
export function getDocsNav(): NavGroup[] {
  return [
    {
      id: "installation",
      title: "Installation",
      links: docsPages.map((page) => ({ title: page.navTitle ?? page.title, href: page.href })),
    },
    {
      id: "components",
      title: "Components",
      links: [
        { title: "All components", href: "/components" },
        ...getItems("components").map((item) => ({ title: item.title, href: item.href })),
      ],
    },
    {
      id: "blocks",
      title: "Blocks",
      links: [
        { title: "All blocks", href: "/blocks" },
        ...getItems("blocks").map((item) => ({ title: item.title, href: item.href })),
      ],
    },
  ]
}
