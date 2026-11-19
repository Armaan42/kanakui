import { defineItem } from "../define.ts"

export default defineItem({
  "name": "music-box",
  "type": "registry:ui",
  "title": "Music Box",
  "description": "A wind-up music box: turn the crank and the pins on a brass drum pluck a steel comb to play a tune.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/music-box.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-music-box-twang": "music-box-twang 0.5s ease-out"
    }
  },
  "css": {
    "@keyframes music-box-twang": {
      "0%": {
        "transform": "rotate(0deg)"
      },
      "15%": {
        "transform": "rotate(-5deg)"
      },
      "35%": {
        "transform": "rotate(3deg)"
      },
      "55%": {
        "transform": "rotate(-2deg)"
      },
      "75%": {
        "transform": "rotate(1deg)"
      },
      "100%": {
        "transform": "rotate(0deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "tune",
        "type": "{ beat: number; note: string }[]",
        "description": "Pins on the drum. Notes are written like `C5` or `F#4`.",
        "default": "Twinkle, Twinkle, Little Star"
      },
      {
        "name": "beats",
        "type": "number",
        "description": "Beats in one turn of the drum.",
        "default": "48"
      },
      {
        "name": "beatsPerTurn",
        "type": "number",
        "description": "Beats the drum moves per turn of the crank.",
        "default": "8"
      },
      {
        "name": "tempo",
        "type": "number",
        "description": "Speed of the Play button, in beats per minute.",
        "default": "108"
      },
      {
        "name": "title",
        "type": "string",
        "description": "Printed on the label in the lid."
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play the notes.",
        "default": "true"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Write your own `tune` as `{ beat, note }` pins; the comb gets one tooth for each note the tune uses."
    ],
    "accessibility": [
      "The crank is a slider: the right arrow turns it one beat and Page Up four. A Play button turns it for you. It only turns forward, like a real music box."
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
