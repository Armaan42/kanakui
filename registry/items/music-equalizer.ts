import { defineItem } from "../define.ts"

export default defineItem({
  "name": "music-equalizer",
  "type": "registry:ui",
  "title": "Music Equalizer",
  "description": "A graphic equalizer panel with faders, LED columns, a response curve and presets.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/music-equalizer.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "bands",
        "type": "string[]",
        "description": "Band labels, low to high."
      },
      {
        "name": "value",
        "type": "number[]",
        "description": "Controlled gains in decibels."
      },
      {
        "name": "defaultValue",
        "type": "number[]",
        "description": "Initial gains."
      },
      {
        "name": "presets",
        "type": "{ name: string; gains: number[] }[]",
        "description": "Preset buttons."
      },
      {
        "name": "range",
        "type": "number",
        "description": "Largest boost or cut in decibels.",
        "default": "12"
      },
      {
        "name": "onValueChange",
        "type": "(gains: number[]) => void",
        "description": "Called when a gain changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "It makes no sound itself. Apply `onValueChange` to Web Audio `BiquadFilterNode` gains to shape real audio."
    ],
    "accessibility": [
      "Faders are native range inputs that announce their value in decibels; presets are radio buttons."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
