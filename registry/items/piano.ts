import { defineItem } from "../define.ts"

export default defineItem({
  "name": "piano",
  "type": "registry:ui",
  "title": "Piano",
  "description": "A playable piano with a triangle-and-sine tone: press, glide or play from the computer keyboard.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "inputs"
  ],
  "files": [
    {
      "path": "registry/default/ui/piano.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "octaves",
        "type": "number",
        "description": "Octaves to show, starting at C.",
        "default": "2"
      },
      {
        "name": "startOctave",
        "type": "number",
        "description": "Octave of the lowest C.",
        "default": "4"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      },
      {
        "name": "onNote",
        "type": "(note: string) => void",
        "description": "Called with each note played, e.g. `C#4`."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Use `onNote` to drive your own instrument or a lesson."
    ],
    "accessibility": [
      "Focus the keys and play with the A to ; row (W E T Y U O P for black keys). Each key has its note as its name, and the last note is announced."
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
