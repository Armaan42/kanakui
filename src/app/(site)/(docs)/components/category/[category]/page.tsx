import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ItemsIndex } from "@/components/site/items-index"
import { getCategories, getCategory } from "@/lib/registry"

export function generateStaticParams() {
  return getCategories("components").map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/components/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory("components", slug)
  if (!category) return {}
  return { title: `${category.title} components`, description: category.description }
}

export default async function ComponentCategoryPage({ params }: PageProps<"/components/category/[category]">) {
  const { category: slug } = await params
  const category = getCategory("components", slug)
  if (!category) notFound()
  return <ItemsIndex kind="components" category={category} />
}
