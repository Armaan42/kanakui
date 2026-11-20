import { defineItem } from "../define.ts"

export default defineItem({
  "name": "growing-plant",
  "type": "registry:ui",
  "title": "Growing Plant",
  "description": "A potted plant that grows from seed to flower when you give it light and water it when the soil is dry.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/growing-plant.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-growing-plant-pop": "growing-plant-pop 0.6s cubic-bezier(.3,1.5,.5,1) both",
      "animate-growing-plant-can": "growing-plant-can 1.4s ease-in-out forwards",
      "animate-growing-plant-drop": "growing-plant-drop 0.6s ease-in both"
    }
  },
  "css": {
    "@keyframes growing-plant-pop": {
      "from": {
        "transform": "scale(0)"
      },
      "to": {
        "transform": "scale(1)"
      }
    },
    "@keyframes growing-plant-can": {
      "0%": {
        "transform": "translate(20px, -10px) rotate(0deg)",
        "opacity": "0"
      },
      "15%": {
        "transform": "translate(0, 0) rotate(0deg)",
        "opacity": "1"
      },
      "30%, 75%": {
        "transform": "translate(0, 0) rotate(-25deg)",
        "opacity": "1"
      },
      "100%": {
        "transform": "translate(0, 0) rotate(0deg)",
        "opacity": "0"
      }
    },
    "@keyframes growing-plant-drop": {
      "from": {
        "transform": "translateY(0)",
        "opacity": "1"
      },
      "to": {
        "transform": "translateY(115px)",
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "bloom",
        "type": "string",
        "description": "Petal colour.",
        "default": "\"#f472b6\""
      },
      {
        "name": "onBloom",
        "type": "() => void",
        "description": "Called when it flowers."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "A gentle way to show progress, e.g. one stage per completed task."
    ],
    "accessibility": [
      "Water and Sunlight are buttons; the plant’s stage and the soil are described and announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
