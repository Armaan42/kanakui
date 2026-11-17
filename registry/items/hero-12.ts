import { defineItem } from "../define.ts"

export default defineItem({
  "name": "hero-12",
  "type": "registry:block",
  "title": "Card Product Hero",
  "description": "A fintech hero with benefits, calls to action and a holographic payment card.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "hero"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "holo-card"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/hero-12/components/hero-12.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. Edit the content directly in the file.",
    "requirements": [
      "shadcn `button` and VenusUI `holo-card`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Swap the benefits, the card holder and the floating chips for your product's real numbers."
    ],
    "accessibility": [
      "One `h1`. The card can be flipped with a click or key press; the chips are plain text."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
