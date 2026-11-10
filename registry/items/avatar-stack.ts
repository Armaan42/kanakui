import { defineItem } from "../define.ts"

export default defineItem({
  name: "avatar-stack",
  type: "registry:ui",
  title: "Avatar Stack",
  description: "Overlapping avatars with a +N counter that spread apart on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["data-display"],
  files: [{ path: "registry/default/ui/avatar-stack.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "people", type: "{ name: string; src?: string }[]", description: "People to show. Without `src`, initials are used. Required." },
      { name: "max", type: "number", default: "5", description: "Avatars shown before “+N”." },
      { name: "size", type: "number", default: "36", description: "Avatar size in pixels." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["Tailwind CSS v4. Works in Server Components."],
    customization: ["Uses a plain `<img>` so it works anywhere; swap in `next/image` in Next.js if you prefer.", "The ring between avatars uses the background color, so it adapts to your theme."],
    accessibility: ["The group is one labelled image naming everyone (“A, B, C and 3 more”), instead of many unlabeled pictures."],
    troubleshooting: [{ problem: "Next.js warns about `<img>`.", solution: "It’s a lint warning from `@next/next/no-img-element`. Switch to `next/image`, or keep the plain image." }],
  },
})
