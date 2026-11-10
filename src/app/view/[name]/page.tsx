import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/site/component-preview"
import { getComponent, getComponents } from "@/lib/registry"

/**
 * Bare, full-viewport render of a component demo. Loaded in the preview
 * iframe on component pages (so breakpoints react to the iframe's width) and
 * opened directly by "Open full screen". Not part of the site's navigation.
 */
export function generateStaticParams() {
  return getComponents().map((component) => ({ name: component.name }))
}

export async function generateMetadata({ params }: PageProps<"/view/[name]">): Promise<Metadata> {
  const { name } = await params
  const component = getComponent(name)
  if (!component) return {}
  return {
    title: `${component.title} preview`,
    robots: { index: false, follow: false },
  }
}

export default async function ViewPage({ params }: PageProps<"/view/[name]">) {
  const { name } = await params
  const component = getComponent(name)
  if (!component) notFound()

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="sr-only">{component.title} preview</h1>
      <ComponentPreview name={component.name} eager className="min-h-svh flex-1" />
    </main>
  )
}
