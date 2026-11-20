import { defineItem } from "../define.ts"

export default defineItem({
  "name": "folding-map",
  "type": "registry:ui",
  "title": "Folding Map",
  "description": "A paper map that unfolds in 3D, panel by panel, from its cover to the whole town.",
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
      "path": "registry/default/ui/folding-map.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "title",
        "type": "string",
        "description": "On the cover.",
        "default": "\"Port Haven\""
      },
      {
        "name": "subtitle",
        "type": "string",
        "description": "Under the title.",
        "default": "\"Walking map\""
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Your own map, drawn in a 600 × 400 SVG space."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Pass your own SVG shapes as `children`; each panel shows its third of the width and half of the height."
    ],
    "accessibility": [
      "One button folds and unfolds, the state is announced, and the map is labelled. Reduced motion skips the animation."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
