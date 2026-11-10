import type { Metadata } from "next"

import { ItemsIndex } from "@/components/site/items-index"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Ready-made page sections (heroes, pricing, footers) you can add to your project with the shadcn CLI.",
}

export default function BlocksPage() {
  return <ItemsIndex kind="blocks" />
}
