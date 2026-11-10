import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-05",
  type: "registry:block",
  title: "Launch Hero with Meteors",
  description: "A framed launch announcement with falling meteors and a rotating keyword.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["meteors", "rotating-words"],
  files: [{ path: "registry/default/blocks/hero-05/components/hero-05.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the badge, headline words and actions in the file.",
    requirements: [
      "shadcn `button`, kanakui `meteors` and `rotating-words`. The CLI installs them with their CSS.",
      "`lucide-react`, React 19 and Tailwind CSS v4.",
    ],
    customization: [
      "Change the badge text for each launch day, and the rotating words to match your theme.",
      "Use fewer meteors (`count={12}`) for a calmer panel.",
    ],
    accessibility: ["One `h1`; screen readers hear the rotating words once.", "Meteors are hidden and words stop rotating with reduced motion."],
    troubleshooting: [{ problem: "Meteors leave the panel.", solution: "The panel has `overflow-hidden`; keep it." }],
  },
})
