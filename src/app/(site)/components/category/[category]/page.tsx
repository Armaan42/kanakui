import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CategoryNav } from "@/components/site/category-nav"
import { ComponentsBrowser } from "@/components/site/components-browser"
import { PageHeader } from "@/components/site/page-header"
import { getCategories, getCategory, getComponents, getComponentsByCategory } from "@/lib/registry"

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/components/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return {
    title: `${category.title} components`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps<"/components/category/[category]">) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const components = getComponentsByCategory(category.slug)

  return (
    <div className="page-container space-y-8 py-10 sm:py-14">
      <PageHeader title={category.title} description={category.description} />
      <CategoryNav categories={getCategories()} total={getComponents().length} active={category.slug} />
      <ComponentsBrowser components={components} />
    </div>
  )
}
