import { defineItem } from "../define.ts"

export default defineItem({
  "name": "wax-seal",
  "type": "registry:ui",
  "title": "Wax Seal",
  "description": "An envelope sealed with wax: the wax pours, a stamp presses your initials, and breaking it reveals the letter.",
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
      "path": "registry/default/ui/wax-seal.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-wax-seal-pour": "wax-seal-pour 0.6s cubic-bezier(.3,1.4,.5,1) both",
      "animate-wax-seal-stamp": "wax-seal-stamp 0.9s ease-in-out both",
      "animate-wax-seal-left": "wax-seal-left 0.8s ease-in forwards",
      "animate-wax-seal-right": "wax-seal-right 0.8s ease-in forwards"
    }
  },
  "css": {
    "@keyframes wax-seal-pour": {
      "from": {
        "transform": "scale(0.2)",
        "opacity": "0.6"
      },
      "to": {
        "transform": "scale(1)",
        "opacity": "1"
      }
    },
    "@keyframes wax-seal-stamp": {
      "0%": {
        "transform": "translateY(-80px)",
        "opacity": "0"
      },
      "25%": {
        "transform": "translateY(-80px)",
        "opacity": "1"
      },
      "50%, 65%": {
        "transform": "translateY(10px)",
        "opacity": "1"
      },
      "100%": {
        "transform": "translateY(-90px)",
        "opacity": "0"
      }
    },
    "@keyframes wax-seal-left": {
      "to": {
        "transform": "translate(-14px, 18px) rotate(-18deg)"
      }
    },
    "@keyframes wax-seal-right": {
      "to": {
        "transform": "translate(14px, 22px) rotate(16deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "initials",
        "type": "string",
        "description": "Up to three letters pressed into the wax.",
        "default": "\"AV\""
      },
      {
        "name": "color",
        "type": "string",
        "description": "Wax colour.",
        "default": "\"#9b1c1c\""
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "The letter inside."
      },
      {
        "name": "onSeal",
        "type": "() => void",
        "description": "Called when sealed."
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "description": "Called when the seal is broken."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Lovely for invitations: put the details in `children`."
    ],
    "accessibility": [
      "Sealing and opening are buttons, each step is announced, and the letter is hidden from screen readers until it’s out."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
