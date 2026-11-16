import { defineItem } from "../define.ts"

export default defineItem({
  "name": "pull-cord-lamp",
  "type": "registry:ui",
  "title": "Pull-Cord Lamp",
  "description": "A hanging lamp you switch by pulling its cord; it can toggle the page between light and dark mode.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "buttons"
  ],
  "files": [
    {
      "path": "registry/default/ui/pull-cord-lamp.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-pull-cord-lamp-swing": "pull-cord-lamp-swing 1.1s ease-out"
    }
  },
  "css": {
    "@keyframes pull-cord-lamp-swing": {
      "0%": {
        "transform": "rotate(0deg)"
      },
      "20%": {
        "transform": "rotate(4deg)"
      },
      "45%": {
        "transform": "rotate(-3deg)"
      },
      "70%": {
        "transform": "rotate(1.5deg)"
      },
      "100%": {
        "transform": "rotate(0deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "controlsTheme",
        "type": "boolean",
        "default": "false",
        "description": "Switch the page between light (lamp on) and dark (lamp off) by toggling `.dark` on `<html>`."
      },
      {
        "name": "on, defaultOn",
        "type": "boolean",
        "description": "Controlled or initial state when not controlling the theme."
      },
      {
        "name": "onToggle",
        "type": "(on: boolean) => void",
        "description": "Called after each pull."
      },
      {
        "name": "label",
        "type": "string",
        "default": "\"Light\"",
        "description": "Accessible name for the cord."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the `pull-cord-lamp-swing` keyframes.",
      "`controlsTheme` assumes shadcn's class-based dark mode (`.dark` on `<html>`)."
    ],
    "customization": [
      "With a theme library such as next-themes, leave `controlsTheme` off and call its `setTheme` from `onToggle`, so the choice is saved.",
      "The light cone is a gradient under the bulb; change its color in the first `div`."
    ],
    "accessibility": [
      "The cord is a `switch` with `aria-checked`; a click, tap, Enter or Space toggles it, so dragging is optional.",
      "With reduced motion the lamp doesn't swing."
    ],
    "troubleshooting": [
      {
        "problem": "The theme switches back on reload.",
        "solution": "`controlsTheme` doesn't save the choice; save it yourself in `onToggle`, or use your theme library as described above."
      }
    ]
  }
})
