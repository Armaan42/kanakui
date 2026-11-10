import { defineItem } from "../define.ts"

export default defineItem({
  name: "hero-03",
  type: "registry:block",
  title: "Typewriter Hero",
  description: "A bold centered headline that types a rotating keyword, over a dot pattern.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["hero"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["typewriter", "dot-pattern"],
  files: [{ path: "registry/default/blocks/hero-03/components/hero-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the headline, the `words` list and the actions in the file.",
    requirements: [
      "shadcn `button` and kanakui `typewriter` and `dot-pattern`. The CLI installs them, including the typewriter’s CSS.",
      "`lucide-react`, React 19 and Tailwind CSS v4.",
    ],
    customization: [
      "Keep the rotating words short and similar in length, so the headline doesn’t jump between lines.",
      "Change the dot color with the `className` on `DotPattern`, e.g. `text-primary/20`.",
    ],
    accessibility: [
      "Screen readers hear the headline with all rotating words once, not every keystroke.",
      "With reduced motion the first word is shown without typing.",
    ],
    troubleshooting: [
      { problem: "The caret doesn’t blink.", solution: "Check that the `typewriter-caret` keyframes were added to your CSS (the CLI does this)." },
    ],
  },
})
