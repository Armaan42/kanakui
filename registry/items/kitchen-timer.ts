import { defineItem } from "../define.ts"

export default defineItem({
  "name": "kitchen-timer",
  "type": "registry:ui",
  "title": "Kitchen Timer",
  "description": "A wind-up kitchen timer: twist the dial to set it and it ticks back to zero, then rings.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/kitchen-timer.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-kitchen-timer-ring": "kitchen-timer-ring 0.12s ease-in-out 8"
    }
  },
  "css": {
    "@keyframes kitchen-timer-ring": {
      "0%, 100%": {
        "transform": "rotate(0)"
      },
      "50%": {
        "transform": "rotate(6deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "max",
        "type": "number",
        "description": "Minutes on the dial.",
        "default": "60"
      },
      {
        "name": "defaultMinutes",
        "type": "number",
        "description": "Starting time.",
        "default": "0"
      },
      {
        "name": "onDone",
        "type": "() => void",
        "description": "Called when it rings."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Set `defaultMinutes` to start it running straight away."
    ],
    "accessibility": [
      "The dial is a slider (arrow keys add a minute, Page Up five); the time is a live timer."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
