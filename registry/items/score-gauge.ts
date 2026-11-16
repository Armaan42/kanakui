import { defineItem } from "../define.ts"

export default defineItem({
  "name": "score-gauge",
  "type": "registry:ui",
  "title": "Score Gauge",
  "description": "A speedometer-style gauge whose needle sweeps to a score, with colored rating bands.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "data-display"
  ],
  "files": [
    {
      "path": "registry/default/ui/score-gauge.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "value",
        "type": "number",
        "description": "The score."
      },
      {
        "name": "min, max",
        "type": "number",
        "default": "300, 850",
        "description": "Range of the dial."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Accessible name and caption, e.g. “Credit score”."
      },
      {
        "name": "bands",
        "type": "{ upTo: number; label: string; color: string }[]",
        "description": "Colored ranges; defaults to credit-score bands (Poor to Excellent)."
      },
      {
        "name": "caption",
        "type": "string",
        "description": "Small text under the rating."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use your own `bands` for other scores, e.g. 0–100 with Poor, Needs work and Great."
    ],
    "accessibility": [
      "It's a `meter` whose value text includes the rating (“742, Very good”).",
      "With reduced motion the needle doesn't sweep."
    ],
    "troubleshooting": [
      {
        "problem": "The needle stays at the start.",
        "solution": "It sweeps when 40% of the gauge is in view; check that it isn't hidden or off screen."
      }
    ]
  }
})
