import { defineItem } from "../define.ts"

export default defineItem({
  "name": "spirit-level",
  "type": "registry:ui",
  "title": "Spirit Level",
  "description": "A spirit level you tilt by dragging; the bubble drifts and the vial turns green when it's level.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/spirit-level.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultAngle",
        "type": "number",
        "description": "Starting tilt in degrees.",
        "default": "4"
      },
      {
        "name": "range",
        "type": "number",
        "description": "Largest tilt either way.",
        "default": "12"
      },
      {
        "name": "onAngleChange",
        "type": "(angle: number) => void",
        "description": "Called as the tilt changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use it as a playful alignment control, or feed it real device orientation."
    ],
    "accessibility": [
      "It's a slider: the arrow keys tilt it and Home levels it; it announces “Level” when flat."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
