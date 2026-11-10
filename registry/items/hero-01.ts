import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-01",
  type: "registry:block",
  featured: true,
  title: "Centered Hero",
  description: "A centered hero with an announcement link, two calls to action and a product window placeholder.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "hero"
  ],
  registryDependencies: [
    "button"
  ],
  dependencies: [
    "lucide-react"
  ],
  internalDependencies: [
    "shimmer-button"
  ],
  files: [
    {
      path: "registry/default/blocks/hero-01/components/hero-01.tsx",
      type: "registry:component"
    }
  ],
  pageDocs: {
    props: [],
    extends: "No props. The text, links and layout are in the file. It's your code, so edit it directly.",
    requirements: [
      "shadcn `button` and kanakui `shimmer-button`. The CLI installs both.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."
    ],
    customization: [
      "Replace the headline, paragraph and button labels, and point the announcement link (`href=\"#\"`) at your changelog.",
      "Swap the product window placeholder (marked with a comment) for an `<img>`, `next/image` or a video.",
      "Use `Button` for both actions if you don’t want the shimmer effect."
    ],
    accessibility: [
      "Uses one `h1`. Keep it the only `h1` on the page.",
      "The product window placeholder is `aria-hidden`. Give a real screenshot meaningful `alt` text.",
      "The shimmer effect stops when the user prefers reduced motion."
    ],
    troubleshooting: [
      {
        problem: "The outline button looks different from the preview.",
        solution: "The block uses your project’s own shadcn `button`, so it follows your style and theme. Previews on this site use the Nova style."
      }
    ]
  }
})
