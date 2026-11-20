import { defineItem } from "../define.ts"

export default defineItem({
  "name": "lava-lamp",
  "type": "registry:ui",
  "title": "Lava Lamp",
  "description": "A rocket lava lamp whose wax blobs rise, stretch and merge, with a power switch and four colours.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/lava-lamp.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-lava-lamp-rise": "lava-lamp-rise 15s ease-in-out infinite"
    }
  },
  "css": {
    "@keyframes lava-lamp-rise": {
      "0%, 100%": {
        "transform": "translate(0, 0) scale(1)"
      },
      "45%": {
        "transform": "translate(var(--drift), var(--rise)) scale(0.85, 1.2)"
      },
      "55%": {
        "transform": "translate(var(--drift), var(--rise)) scale(1.15, 0.85)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "colors",
        "type": "LavaColor[]",
        "description": "Palettes: `wax`, `highlight`, and the liquid’s `top` and `bottom` colours."
      },
      {
        "name": "defaultColor",
        "type": "number",
        "description": "Index of the starting palette.",
        "default": "0"
      },
      {
        "name": "defaultOn",
        "type": "boolean",
        "description": "Whether the lamp starts on.",
        "default": "true"
      },
      {
        "name": "onColorChange",
        "type": "(color: LavaColor) => void",
        "description": "Called when the colour changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Add your brand’s colours as a palette in `colors`."
    ],
    "accessibility": [
      "The lamp is an image described by its colour and state; power and colour are buttons. With reduced motion the wax stays still."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
