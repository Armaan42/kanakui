import { defineItem } from "../define.ts"

export default defineItem({
  "name": "microscope",
  "type": "registry:ui",
  "title": "Microscope",
  "description": "A microscope eyepiece: pick an objective, turn the focus until it’s sharp, set the light and move the slide.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/microscope.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultSpecimen",
        "type": "\"onion\" | \"pond\"",
        "description": "Starting slide.",
        "default": "\"onion\""
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each objective focuses at a different knob position, as on a real scope."
    ],
    "accessibility": [
      "The view says what’s on the slide and whether it’s in focus; arrow keys move the slide."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
