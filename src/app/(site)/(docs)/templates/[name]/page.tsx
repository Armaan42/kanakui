import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ItemPage } from "@/components/site/item-page"
import { getItem, getItems } from "@/lib/registry"

export function generateStaticParams() {
  return getItems("templates").map((item) => ({ name: item.name }))
}

export async function generateMetadata({ params }: PageProps<"/templates/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getItem("templates", name)
  if (!item) return {}
  return { title: `${item.title} template`, description: item.description }
}

export default async function TemplatePage({ params }: PageProps<"/templates/[name]">) {
  const { name } = await params
  const item = getItem("templates", name)
  if (!item) notFound()
  return <ItemPage item={item} kind="templates" />
}
