import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/site/component-preview"
import { getAllPreviewableItems, getPreviewableItem, kindOf } from "@/lib/registry"

/**
 * Bare, full-viewport render of a component or block demo. Loaded in preview
 * iframes (so breakpoints react to the iframe's width), in block thumbnails,
 * and opened directly by "Open full screen". Not part of the site navigation.
 */
export function generateStaticParams() {
  return getAllPreviewableItems().map((item) => ({ name: item.name }))
}

export async function generateMetadata({ params }: PageProps<"/view/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getPreviewableItem(name)
  if (!item) return {}
  return {
    title: `${item.title} preview`,
    robots: { index: false, follow: false },
  }
}

export default async function ViewPage({ params }: PageProps<"/view/[name]">) {
  const { name } = await params
  const item = getPreviewableItem(name)
  if (!item) notFound()
  const isBlock = kindOf(item) === "blocks"

  // No heading of our own: blocks bring their own (e.g. the hero's h1), and the
  // document title already names the preview.
  return (
    <main className="flex flex-1 flex-col">
      <ComponentPreview name={item.name} eager fill={isBlock} className={isBlock ? "min-h-svh" : "min-h-svh flex-1"} />
    </main>
  )
}
