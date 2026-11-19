import { defineItem } from "../define.ts"

export default defineItem({
  "name": "dice-roller",
  "type": "registry:ui",
  "title": "Dice Roller",
  "description": "3D dice that tumble and land on a fair, random face, with the total announced.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/dice-roller.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "count",
        "type": "number",
        "description": "How many dice.",
        "default": "2"
      },
      {
        "name": "onRoll",
        "type": "(values: number[]) => void",
        "description": "Called with each roll."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use any `count`; the dice wrap onto more rows on small screens."
    ],
    "accessibility": [
      "Each die and Roll are buttons; the result is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
