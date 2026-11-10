import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ItemsIndex } from "@/components/site/items-index"
import { getCategories, getCategory } from "@/lib/registry"

export function generateStaticParams() {
  return getCategories("blocks").map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blocks/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory("blocks", slug)
  if (!category) return {}
  return { title: `${category.title} blocks`, description: category.description }
}

export default async function BlockCategoryPage({ params }: PageProps<"/blocks/category/[category]">) {
  const { category: slug } = await params
  const category = getCategory("blocks", slug)
  if (!category) notFound()
  return <ItemsIndex kind="blocks" category={category} />
}
