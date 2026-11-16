import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ItemsIndex } from "@/components/site/items-index"
import { getCategories, getCategory, getCategoryDescription } from "@/lib/registry"

// Wait for the full static page on unknown params, so `notFound()` runs before
// streaming starts and the response is a real 404 (not the 200 App Shell).
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return getCategories("components").map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/components/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory("components", slug)
  if (!category) return {}
  return { title: `${category.title} components`, description: getCategoryDescription("components", category) }
}

export default async function ComponentCategoryPage({ params }: PageProps<"/components/category/[category]">) {
  const { category: slug } = await params
  const category = getCategory("components", slug)
  if (!category) notFound()
  return <ItemsIndex kind="components" category={category} />
}
