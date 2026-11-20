import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { usageExamples } from "@/__registry__/usage"
import { UsagePreview } from "@/components/site/usage-preview"
import { getPreviewableItem } from "@/lib/registry"

/**
 * Bare, full-width render of one real-world usage example. Loaded in the
 * "See it in action" frame on component pages and opened by "Open full screen".
 */
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return Object.entries(usageExamples).flatMap(([name, examples]) => examples.map((example) => ({ name, example: example.slug })))
}

function find(name: string, slug: string) {
  const item = getPreviewableItem(name)
  const example = usageExamples[name]?.find((e) => e.slug === slug)
  return item && example ? { item, example } : null
}

export async function generateMetadata({ params }: PageProps<"/view/[name]/[example]">): Promise<Metadata> {
  const { name, example } = await params
  const found = find(name, example)
  if (!found) return {}
  return {
    title: `${found.item.title}: ${found.example.title}`,
    robots: { index: false, follow: false },
  }
}

export default async function UsageExamplePage({ params }: PageProps<"/view/[name]/[example]">) {
  const { name, example } = await params
  if (!find(name, example)) notFound()
  return (
    // A plain block, not a flex column: examples centre themselves with mx-auto and should still fill the width.
    <main className="min-h-svh w-full bg-background">
      <UsagePreview name={name} slug={example} />
    </main>
  )
}
