import { defineItem } from "../define.ts"

export default defineItem({
  "name": "radio-tuner",
  "type": "registry:ui",
  "title": "Radio Tuner",
  "description": "A valve radio's tuning dial with a needle, a signal lamp and stations that fade in.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/radio-tuner.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "stations",
        "type": "{ frequency: number; name: string; genre?: string }[]",
        "description": "Stations on the band."
      },
      {
        "name": "min, max",
        "type": "number",
        "description": "Band in MHz.",
        "default": "88, 108"
      },
      {
        "name": "defaultFrequency",
        "type": "number",
        "description": "Starting frequency.",
        "default": "92.4"
      },
      {
        "name": "onTune",
        "type": "(frequency, station) => void",
        "description": "Called on change."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use it to pick a playlist, a category or an episode."
    ],
    "accessibility": [
      "The knob is a slider (arrows move 0.1 MHz); the station is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
