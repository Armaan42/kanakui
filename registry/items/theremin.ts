import { defineItem } from "../define.ts"

export default defineItem({
  "name": "theremin",
  "type": "registry:ui",
  "title": "Theremin",
  "description": "A theremin: hold and move the pointer, left and right for pitch, up and down for volume, with a live waveform.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/theremin.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-theremin-scroll": "theremin-scroll 1.2s linear infinite"
    }
  },
  "css": {
    "@keyframes theremin-scroll": {
      "from": {
        "transform": "translateX(0)"
      },
      "to": {
        "transform": "translateX(-200px)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "low",
        "type": "number",
        "description": "Lowest note in hertz; the field spans three octaves.",
        "default": "130.81"
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
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Raise `low` for a brighter range, e.g. 261.63 for middle C."
    ],
    "accessibility": [
      "The field is a slider: hold Space to play and use the arrow keys to move your hand. It reports the note, frequency and volume."
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
