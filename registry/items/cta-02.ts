import { defineItem } from "../define.ts"

export default defineItem({
  name: "cta-02",
  type: "registry:block",
  title: "Ripple Call to Action",
  description: "A centered call to action with an icon and gently pulsing rings behind it.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cta"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["ripple-background"],
  files: [{ path: "registry/default/blocks/cta-02/components/cta-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the icon, headline, text and button in the file.",
    requirements: ["shadcn `button` and kanakui `ripple-background`. The CLI installs both.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Swap the rocket for any Lucide icon that fits your product.", "Fewer `rings` make the background quieter."],
    accessibility: ["The headline is an `h2`; rings and icon are decorative.", "Rings stay still with reduced motion."],
    troubleshooting: [{ problem: "Rings are cut off unevenly.", solution: "The section has `overflow-hidden` and centers the rings; keep both." }],
  },
})
