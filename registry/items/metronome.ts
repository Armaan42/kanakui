import { defineItem } from "../define.ts"

export default defineItem({
  "name": "metronome",
  "type": "registry:ui",
  "title": "Metronome",
  "description": "A wind-up metronome whose arm swings in time, with a sliding weight, Italian tempo markings and accented bars.",
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
      "path": "registry/default/ui/metronome.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-metronome-swing": "metronome-swing 1s ease-in-out infinite"
    }
  },
  "css": {
    "@keyframes metronome-swing": {
      "0%, 100%": {
        "transform": "rotate(-24deg)"
      },
      "50%": {
        "transform": "rotate(24deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "defaultTempo",
        "type": "number",
        "description": "Beats per minute, 40–208.",
        "default": "96"
      },
      {
        "name": "defaultBeats",
        "type": "number",
        "description": "Beats in a bar; the first is accented.",
        "default": "4"
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
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "The weight on the arm moves with the tempo, as on a real metronome."
    ],
    "accessibility": [
      "Tempo is a native range input and the beats are toggle buttons. With reduced motion the arm stays still and only the ticks and dots keep time."
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
