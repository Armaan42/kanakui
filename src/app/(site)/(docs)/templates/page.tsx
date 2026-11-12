import type { Metadata } from "next"

import { ItemsIndex } from "@/components/site/items-index"

export const metadata: Metadata = {
  title: "Templates",
  description: "Complete landing pages built from kanakui blocks, installed with one shadcn CLI command.",
}

export default function TemplatesPage() {
  return <ItemsIndex kind="templates" />
}
