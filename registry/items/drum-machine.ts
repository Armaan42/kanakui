import { defineItem } from "../define.ts"

export default defineItem({
  "name": "drum-machine",
  "type": "registry:ui",
  "title": "Drum Machine",
  "description": "A 16-step drum machine with kick, snare, hi-hat and clap, all synthesised in the browser.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/drum-machine.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultPattern",
        "type": "[string, string, string, string]",
        "description": "One row per voice: `x` for a hit, `.` for a rest."
      },
      {
        "name": "defaultTempo",
        "type": "number",
        "description": "Beats per minute.",
        "default": "100"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Write patterns as strings, e.g. `\"x...x...x...x...\"` for four on the floor."
    ],
    "accessibility": [
      "Pads are toggle buttons named by voice and step; the arrow keys move between them, and only one pad is in the tab order."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      },
      {
        "problem": "There’s no sound.",
        "solution": "Browsers only play audio after a click or key press on the page, and the device must not be muted. Pass `sound={false}` to turn it off."
      }
    ]
  }
})
