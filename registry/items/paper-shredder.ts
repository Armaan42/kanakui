import { defineItem } from "../define.ts"

export default defineItem({
  "name": "paper-shredder",
  "type": "registry:ui",
  "title": "Paper Shredder",
  "description": "A desk shredder that feeds a page in and drops it out underneath in curling strips.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/paper-shredder.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-paper-shredder-feed": "paper-shredder-feed 1.6s ease-in forwards",
      "animate-paper-shredder-strip": "paper-shredder-strip 1.5s ease-out 0.5s both"
    }
  },
  "css": {
    "@keyframes paper-shredder-feed": {
      "from": {
        "transform": "translateY(0)"
      },
      "to": {
        "transform": "translateY(115%)"
      }
    },
    "@keyframes paper-shredder-strip": {
      "from": {
        "transform": "translateY(-100%)"
      },
      "to": {
        "transform": "translateY(-48%)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "What's printed on the page."
      },
      {
        "name": "strips",
        "type": "number",
        "description": "Strips the page is cut into.",
        "default": "12"
      },
      {
        "name": "onShred",
        "type": "(count: number) => void",
        "description": "Called when a page is shredded."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "A memorable confirmation for deleting data; run the real deletion in `onShred`."
    ],
    "accessibility": [
      "Shred and New page are buttons, and progress is announced. Reduced motion skips the feed."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
