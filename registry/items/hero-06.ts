import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-06",
  type: "registry:block",
  title: "Before/After Hero",
  description: "A split hero with a draggable before/after comparison of your product's effect.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hero"],
  registryDependencies: ["button"],
  internalDependencies: ["image-compare"],
  files: [{ path: "registry/default/blocks/hero-06/components/hero-06.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Copy and the two comparison layers are in the file.",
    requirements: ["shadcn `button` and kanakui `image-compare`. The CLI installs both.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Replace the two `Placeholder` layers with screenshots of the same size: `<img src=\"/before.png\" alt=\"…\" className=\"size-full object-cover\" />`.",
      "Change the starting split with `defaultPosition`.",
    ],
    accessibility: [
      "The divider is a labelled range input (arrows, Home, End).",
      "Give real screenshots meaningful `alt` text describing what changed.",
    ],
    troubleshooting: [{ problem: "Screenshots don’t line up.", solution: "Use two images with identical dimensions and `object-cover` on both." }],
  },
})
