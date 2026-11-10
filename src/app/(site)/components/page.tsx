import type { Metadata } from "next"

import { ItemsIndex } from "@/components/site/items-index"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse React components you can add to your project with the shadcn CLI.",
}

export default function ComponentsPage() {
  return <ItemsIndex kind="components" />
}
