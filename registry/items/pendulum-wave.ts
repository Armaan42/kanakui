import { defineItem } from "../define.ts"

export default defineItem({
  "name": "pendulum-wave",
  "type": "registry:ui",
  "title": "Pendulum Wave",
  "description": "A pendulum wave: fifteen pendulums drift in and out of step, making snakes and waves before lining up again.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/pendulum-wave.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "count",
        "type": "number",
        "description": "Number of pendulums.",
        "default": "15"
      },
      {
        "name": "cycle",
        "type": "number",
        "description": "Seconds until they line up again.",
        "default": "60"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "The physics is real: each pendulum’s length is set by its period."
    ],
    "accessibility": [
      "Play and pause are buttons, it starts paused with reduced motion, and the time in the cycle is shown."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
