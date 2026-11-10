import { defineItem } from "../define.ts"

export default defineItem({
  name: "use-pointer-position",
  type: "registry:hook",
  title: "usePointerPosition",
  description: "Expose the pointer position over an element as CSS variables, without re-rendering.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "hooks",
    "interactive"
  ],
  files: [
    {
      path: "registry/default/hooks/use-pointer-position.ts",
      type: "registry:hook"
    }
  ]
})
