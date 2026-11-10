import { defineItem } from "../define.ts"

export default defineItem({
  name: "kbd",
  type: "registry:ui",
  title: "Kbd",
  description: "Keyboard keys and key combinations using the semantic kbd element.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["data-display"],
  files: [{ path: "registry/default/ui/kbd.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "raised", type: "boolean", default: "true", description: "Kbd: thicker bottom border so it looks like a key." },
      { name: "keys", type: "string[]", description: "KbdCombo: keys in order, e.g. `[\"⌘\", \"K\"]`." },
    ],
    extends: "`Kbd` accepts all `<kbd>` props.",
    requirements: ["Tailwind CSS v4. Works in Server Components."],
    customization: ["Show platform-specific shortcuts by choosing `⌘` or `Ctrl` in your own code."],
    accessibility: ["Uses `<kbd>`; combinations nest keys inside an outer `<kbd>`, the HTML way to mark up key combos. The “+” is decorative."],
    troubleshooting: [{ problem: "Symbols such as ⌘ don’t show.", solution: "Use a font that includes them, or write “Cmd”." }],
  },
})
