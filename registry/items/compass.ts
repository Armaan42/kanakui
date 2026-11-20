import { defineItem } from "../define.ts"

export default defineItem({
  "name": "compass",
  "type": "registry:ui",
  "title": "Compass",
  "description": "A brass compass whose card swings and settles on a spring, and can follow your phone’s heading.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/compass.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultHeading",
        "type": "number",
        "description": "Direction you start out facing.",
        "default": "30"
      },
      {
        "name": "onHeadingChange",
        "type": "(heading: number) => void",
        "description": "Called as the heading changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "On phones a button uses the device’s compass (iOS asks permission)."
    ],
    "accessibility": [
      "The compass is a slider: arrows turn 5°, Page Up and Down 45°. The heading is read with its compass point."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
