import { defineItem } from "../define.ts"

export default defineItem({
  "name": "zoetrope",
  "type": "registry:ui",
  "title": "Zoetrope",
  "description": "A spinning 3D zoetrope drum with twelve drawings, and a peephole where they blur into motion.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/zoetrope.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultSpeed",
        "type": "number",
        "description": "Turns per minute.",
        "default": "40"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Draw your own 12 frames in `Frame` for a different loop."
    ],
    "accessibility": [
      "Speed is a native slider and the spin can be paused; it starts paused with reduced motion."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
