import { defineItem } from "../define.ts"

export default defineItem({
  "name": "thermostat",
  "type": "registry:ui",
  "title": "Thermostat",
  "description": "A round thermostat whose ring glows warm when heating and cool when cooling.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/thermostat.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "min, max",
        "type": "number",
        "description": "Range.",
        "default": "10, 30"
      },
      {
        "name": "defaultValue",
        "type": "number",
        "description": "Target temperature.",
        "default": "21"
      },
      {
        "name": "current",
        "type": "number",
        "description": "Room temperature.",
        "default": "19"
      },
      {
        "name": "unit",
        "type": "string",
        "description": "Unit label.",
        "default": "\"°C\""
      },
      {
        "name": "onValueChange",
        "type": "(value: number) => void",
        "description": "Called on change."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use any range and unit, such as Fahrenheit or oven temperatures."
    ],
    "accessibility": [
      "It's a slider: arrows move 0.5, Page Up and Down 2; it announces heating or cooling."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
