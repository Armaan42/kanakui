import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-04",
  type: "registry:block",
  title: "Spotlight Features",
  description: "Four feature cards with a soft light that follows the pointer.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["features"],
  dependencies: ["lucide-react"],
  internalDependencies: ["spotlight-card"],
  files: [{ path: "registry/default/blocks/features-04/components/features-04.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Features are in the `features` array at the top of the file.",
    requirements: ["kanakui `spotlight-card` (the CLI installs it and its hook), `lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Edit the `features` array; use any Lucide icon.", "Give the spotlight a brand tint with `spotlightColor` on each card."],
    accessibility: ["Each card has an `h3` under the section’s `h2`.", "The light is decorative and hidden with reduced motion."],
    troubleshooting: [{ problem: "No light appears.", solution: "It only shows while a mouse is over a card." }],
  },
})
