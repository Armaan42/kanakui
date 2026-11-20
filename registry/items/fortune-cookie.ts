import { defineItem } from "../define.ts"

export default defineItem({
  "name": "fortune-cookie",
  "type": "registry:ui",
  "title": "Fortune Cookie",
  "description": "A fortune cookie that cracks in two to reveal a fortune and five lucky numbers.",
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
      "path": "registry/default/ui/fortune-cookie.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-fortune-cookie-crumbs": "fortune-cookie-crumbs 0.9s ease-in forwards",
      "animate-fortune-cookie-slip": "fortune-cookie-slip 0.5s ease-out both"
    }
  },
  "css": {
    "@keyframes fortune-cookie-crumbs": {
      "from": {
        "transform": "translateY(0)",
        "opacity": "1"
      },
      "to": {
        "transform": "translateY(30px)",
        "opacity": "0"
      }
    },
    "@keyframes fortune-cookie-slip": {
      "from": {
        "transform": "translateY(-10px) scaleX(0.6)",
        "opacity": "0"
      },
      "to": {
        "transform": "translateY(0) scaleX(1)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "fortunes",
        "type": "string[]",
        "description": "Fortunes it can hold."
      },
      {
        "name": "onOpen",
        "type": "(fortune: string) => void",
        "description": "Called when a cookie is cracked."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Use your own `fortunes` for tips, coupons or onboarding hints."
    ],
    "accessibility": [
      "The cookie is a button and the fortune is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
