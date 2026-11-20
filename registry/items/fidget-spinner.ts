import { defineItem } from "../define.ts"

export default defineItem({
  "name": "fidget-spinner",
  "type": "registry:ui",
  "title": "Fidget Spinner",
  "description": "A fidget spinner with real momentum: flick it and it spins down on its bearings, showing the RPM.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/fidget-spinner.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "color",
        "type": "string",
        "description": "Body colour.",
        "default": "\"#0d9488\""
      },
      {
        "name": "friction",
        "type": "number",
        "description": "How quickly it slows: higher stops sooner.",
        "default": "1"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Lower `friction` for a longer spin."
    ],
    "accessibility": [
      "Press Space or the Spin button to flick it; the RPM is shown as text."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
