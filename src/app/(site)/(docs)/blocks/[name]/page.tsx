import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ItemPage } from "@/components/site/item-page"
import { getItem, getItems } from "@/lib/registry"

// Wait for the full static page on unknown params, so `notFound()` runs before
// streaming starts and the response is a real 404 (not the 200 App Shell).
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return getItems("blocks").map((item) => ({ name: item.name }))
}

export async function generateMetadata({ params }: PageProps<"/blocks/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getItem("blocks", name)
  if (!item) return {}
  return { title: item.title, description: item.description }
}

export default async function BlockPage({ params }: PageProps<"/blocks/[name]">) {
  const { name } = await params
  const item = getItem("blocks", name)
  if (!item) notFound()
  return <ItemPage item={item} kind="blocks" />
}
