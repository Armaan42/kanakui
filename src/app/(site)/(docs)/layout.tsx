import { DocsMobileNav, DocsSidebar } from "@/components/site/docs-sidebar"
import { getDocsNav } from "@/lib/docs-nav"

/**
 * Shared layout for /docs, /components and /blocks: a sticky sidebar with the
 * installation guides and every component and block, beside the page.
 */
export default function DocsLayout({ children }: LayoutProps<"/">) {
  const groups = getDocsNav()

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-3 py-6 lg:block">
        <DocsSidebar groups={groups} />
      </aside>
      <div className="min-w-0 flex-1">
        <DocsMobileNav groups={groups} />
        {children}
      </div>
    </div>
  )
}
