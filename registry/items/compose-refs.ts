import { defineItem } from "../define.ts"

export default defineItem({
  name: "compose-refs",
  type: "registry:lib",
  title: "Compose Refs",
  description: "Merge multiple React refs into a single callback ref.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "utilities"
  ],
  files: [
    {
      path: "registry/default/lib/compose-refs.ts",
      type: "registry:lib"
    }
  ]
})
