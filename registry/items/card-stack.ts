import { defineItem } from "../define.ts"

export default defineItem({
  name: "card-stack",
  type: "registry:ui",
  title: "Card Stack",
  description: "Stacked cards with the next ones peeking out; Next sends the top card to the back.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cards", "interactive", "animations"],
  dependencies: ["motion", "lucide-react"],
  files: [{ path: "registry/default/ui/card-stack.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "items", type: "{ id: string; label: string; content: ReactNode }[]", description: "Cards. `label` is announced when a card reaches the top. Required." },
      { name: "label", type: "string", default: "\"Card stack\"", description: "Accessible name for the stack." },
    ],
    extends: "Only the props above, plus `className`.",
    requirements: ["`motion` and `lucide-react`. The CLI installs both.", "React 19 and Tailwind CSS v4."],
    customization: ["Three cards are visible; change `VISIBLE` in the file for a deeper stack."],
    accessibility: ["Only the top card is interactive; the others are `inert`. The top card’s label is announced.", "Cards swap without moving with reduced motion."],
    troubleshooting: [{ problem: "Content is cut off.", solution: "Cards are `h-48`; increase it (and the wrapper `h-56`) for more content." }],
  },
})
