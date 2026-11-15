import { defineItem } from "../define.ts"

export default defineItem({
  "name": "vinyl-player",
  "type": "registry:ui",
  "title": "Vinyl Player",
  "description": "A turntable whose tonearm swings onto the record and spins it, with the album cover as the label.",
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
      "path": "registry/default/ui/vinyl-player.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "cover",
        "type": "{ src: string; alt: string }",
        "description": "Album cover, shown as the record's label."
      },
      {
        "name": "title, artist",
        "type": "string",
        "description": "Shown under the player and in the play button's label."
      },
      {
        "name": "playing",
        "type": "boolean",
        "description": "Controlled playing state."
      },
      {
        "name": "defaultPlaying",
        "type": "boolean",
        "default": "false",
        "description": "Start playing."
      },
      {
        "name": "onPlayingChange",
        "type": "(playing: boolean) => void",
        "description": "Called when the play button or the record is pressed."
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1.8",
        "description": "Seconds per turn. 1.8 is a real 33⅓ rpm record."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for the play and pause icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "It plays no audio: connect `onPlayingChange` to your own `<audio>` element to play the track.",
      "Size it with a width class; the turntable keeps a 5:4 shape."
    ],
    "accessibility": [
      "The record and the round button are both real buttons with clear labels (“Play Tidal Bloom by Mara Lune”, “Pause”).",
      "“Now playing” and “Paused” are announced politely; the cover’s description is kept for screen readers.",
      "With reduced motion the record doesn’t spin and the tonearm moves without animation."
    ],
    "troubleshooting": [
      {
        "problem": "The record doesn't spin.",
        "solution": "Check that reduced motion is off in your system settings; it's deliberately still when it's on."
      }
    ]
  }
})
