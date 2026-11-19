import { defineItem } from "../define.ts"

export default defineItem({
  "name": "wall-calendar",
  "type": "registry:ui",
  "title": "Wall Calendar",
  "description": "A hanging calendar whose pages flip from the binding, with single-day or range selection.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "inputs",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/wall-calendar.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-wall-calendar-flip": "wall-calendar-flip 0.45s ease-out both"
    }
  },
  "css": {
    "@keyframes wall-calendar-flip": {
      "from": {
        "transform": "rotateX(-72deg)",
        "opacity": "0.4"
      },
      "to": {
        "transform": "rotateX(0)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "defaultMonth",
        "type": "Date",
        "description": "Month shown first. Required so server and browser match."
      },
      {
        "name": "mode",
        "type": "\"single\" | \"range\"",
        "description": "Pick one day or a range.",
        "default": "\"single\""
      },
      {
        "name": "selected",
        "type": "{ from: Date | null; to: Date | null }",
        "description": "Controlled selection."
      },
      {
        "name": "defaultSelected",
        "type": "{ from: Date | null; to: Date | null }",
        "description": "Initial selection."
      },
      {
        "name": "onSelectedChange",
        "type": "(selection) => void",
        "description": "Called when the selection changes."
      },
      {
        "name": "photos",
        "type": "{ src: string; alt: string }[]",
        "description": "Photos for the months, repeating as needed."
      },
      {
        "name": "isDateDisabled",
        "type": "(date: Date) => boolean",
        "description": "Days that can’t be picked."
      },
      {
        "name": "weekStartsOn",
        "type": "0 | 1",
        "description": "0 is Sunday, 1 is Monday.",
        "default": "1"
      },
      {
        "name": "locale",
        "type": "string",
        "description": "Language for month and day names.",
        "default": "\"en-US\""
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Create dates with `new Date(year, month, day)` so they stay on the same local day."
    ],
    "accessibility": [
      "The month is a grid: arrow keys move by day and week, Page Up and Page Down move by month.",
      "Every day has its full date as its name."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
