import { defineItem } from "../define.ts"

export default defineItem({
  "name": "label-maker",
  "type": "registry:ui",
  "title": "Label Maker",
  "description": "A handheld label maker that prints embossed tape letter by letter; cut labels land on a shelf.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "inputs"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/label-maker.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultText",
        "type": "string",
        "description": "Starting text.",
        "default": "\"Spices\""
      },
      {
        "name": "tapes",
        "type": "{ name: string; color: string }[]",
        "description": "Tape colours."
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      },
      {
        "name": "onLabel",
        "type": "(text: string) => void",
        "description": "Called when a label is cut."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Use it for tags or folders; `onLabel` hands you each label."
    ],
    "accessibility": [
      "The text field, tape colours, Print and Cut are standard controls, and progress is announced. Labels can be peeled off with a button."
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
