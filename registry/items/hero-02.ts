import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-02",
  type: "registry:block",
  title: "Split Hero with Terminal",
  description: "Pitch, checklist and actions on the left, a terminal card on the right, over a faded grid.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["grid-pattern"],
  files: [{ path: "registry/default/blocks/hero-02/components/hero-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Copy, checklist and terminal lines are in the file.",
    requirements: ["shadcn `button` and kanakui `grid-pattern`. The CLI installs both.", "`lucide-react` for icons, React 19 and Tailwind CSS v4."],
    customization: [
      "Edit the `points` array for the checklist and the `<code>` lines for the terminal.",
      "Swap the terminal card for a screenshot by replacing the right-hand `div`.",
      "Remove `<GridPattern />` for a plain background.",
    ],
    accessibility: [
      "One `h1`; keep it the only one on the page.",
      "The terminal is real text in a `pre`, so it is readable and can be copied.",
    ],
    troubleshooting: [
      { problem: "The terminal text overflows on phones.", solution: "The `pre` scrolls sideways; shorten long commands if you’d rather avoid scrolling." },
    ],
  },
})
