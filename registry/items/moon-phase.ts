import { defineItem } from "../define.ts"

export default defineItem({
  "name": "moon-phase",
  "type": "registry:ui",
  "title": "Moon Phase",
  "description": "The moon’s phase for any date: the right shape of light, its name, how lit it is and the next full moon.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/moon-phase.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultDate",
        "type": "string",
        "description": "Start date as YYYY-MM-DD. Defaults to today."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Accurate to within about a day; it uses the mean lunar month from a known new moon."
    ],
    "accessibility": [
      "The moon is described by its phase and light; the date is a native date field with day buttons."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
