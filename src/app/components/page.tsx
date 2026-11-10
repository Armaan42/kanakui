import type { Metadata } from "next"

import { CategoryNav } from "@/components/site/category-nav"
import { ComponentsBrowser } from "@/components/site/components-browser"
import { PageHeader } from "@/components/site/page-header"
import { getCategories, getComponents } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse React components you can add to your project with the shadcn CLI.",
}

export default function ComponentsPage() {
  const components = getComponents()

  return (
    <div className="page-container space-y-8 py-10 sm:py-14">
      <PageHeader
        title="Components"
        description={`${components.length} ${components.length === 1 ? "component" : "components"} you can add to your project with one command. The source code is copied into your project for you to change.`}
      />
      <CategoryNav categories={getCategories()} total={components.length} />
      <ComponentsBrowser components={components} />
    </div>
  )
}
