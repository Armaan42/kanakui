import { defineItem } from "../define.ts"

export default defineItem({
  "name": "cassette-player",
  "type": "registry:ui",
  "title": "Cassette Player",
  "description": "A cassette tape whose reels turn and wind the tape from one side to the other as it plays.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/cassette-player.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "title, artist",
        "type": "string",
        "description": "Handwritten on the label and shown under the tape."
      },
      {
        "name": "duration",
        "type": "number",
        "default": "214",
        "description": "Track length in seconds; the tape winds across it."
      },
      {
        "name": "side",
        "type": "string",
        "default": "\"A\"",
        "description": "Printed on the label."
      },
      {
        "name": "accent",
        "type": "string",
        "default": "oklch(0.72 0.17 35)",
        "description": "Label stripe color: any CSS color."
      },
      {
        "name": "playing, defaultPlaying",
        "type": "boolean",
        "description": "Controlled or initial playing state."
      },
      {
        "name": "onPlayingChange",
        "type": "(playing: boolean) => void",
        "description": "Called on play, pause and when the track ends."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for the controls. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "It plays no audio: connect `onPlayingChange` to your own `<audio>` element."
    ],
    "accessibility": [
      "Play, pause and rewind are labelled buttons; the time is shown as text.",
      "With reduced motion the reels don't spin (the tape still winds)."
    ],
    "troubleshooting": [
      {
        "problem": "The label text is tiny or huge.",
        "solution": "The label scales with the cassette's width; set a width on it (e.g. `w-96`)."
      }
    ]
  }
})
