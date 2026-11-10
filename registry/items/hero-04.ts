import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-04",
  type: "registry:block",
  title: "Retro Grid Hero",
  description: "A centered hero over a receding retro grid, with a gradient headline and one action.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["hero"],
  internalDependencies: ["retro-grid", "gradient-text", "slide-arrow-button"],
  files: [{ path: "registry/default/blocks/hero-04/components/hero-04.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the headline, text and button label in the file.",
    requirements: ["kanakui `retro-grid`, `gradient-text` and `slide-arrow-button`. The CLI installs them with their CSS.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Keep the gradient headline short. Two or three words read best.",
      "Point the button at your sign-up: wrap it in a link or add an `onClick`.",
    ],
    accessibility: ["One `h1`; the grid is decorative.", "Grid and gradient stop moving with reduced motion."],
    troubleshooting: [{ problem: "The grid doesn’t move.", solution: "Check that the `retro-grid` keyframes are in your CSS (the CLI adds them)." }],
  },
})
