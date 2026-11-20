import { defineItem } from "../define.ts"

export default defineItem({
  "name": "sliding-puzzle",
  "type": "registry:ui",
  "title": "Sliding Puzzle",
  "description": "A sliding tile puzzle: slide rows of tiles into the gap until the picture is whole again.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/sliding-puzzle.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-sliding-puzzle-done": "sliding-puzzle-done 0.5s ease-out both"
    }
  },
  "css": {
    "@keyframes sliding-puzzle-done": {
      "from": {
        "transform": "scale(0.6)",
        "opacity": "0"
      },
      "to": {
        "transform": "scale(1)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "size",
        "type": "number",
        "description": "Tiles per side.",
        "default": "4"
      },
      {
        "name": "src",
        "type": "string",
        "description": "A square image to cut up. Defaults to a painted sunset."
      },
      {
        "name": "alt",
        "type": "string",
        "description": "Describes the image."
      },
      {
        "name": "onSolve",
        "type": "(moves: number) => void",
        "description": "Called when solved."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Shuffles are made of legal moves, so every puzzle can be solved."
    ],
    "accessibility": [
      "Tiles are buttons, the arrow keys slide a tile into the gap, and the move count is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
