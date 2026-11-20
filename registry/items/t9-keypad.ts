import { defineItem } from "../define.ts"

export default defineItem({
  "name": "t9-keypad",
  "type": "registry:ui",
  "title": "T9 Keypad",
  "description": "An old phone keypad with multi-tap typing, sentence case and a 160-character countdown.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/t9-keypad.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-t9-keypad-caret": "t9-keypad-caret 1s linear infinite"
    }
  },
  "css": {
    "@keyframes t9-keypad-caret": {
      "0%, 49%": {
        "opacity": "1"
      },
      "50%, 100%": {
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "defaultValue",
        "type": "string",
        "description": "Starting text."
      },
      {
        "name": "maxLength",
        "type": "number",
        "description": "Characters allowed.",
        "default": "160"
      },
      {
        "name": "delay",
        "type": "number",
        "description": "Milliseconds before a tapped letter is locked in.",
        "default": "900"
      },
      {
        "name": "onValueChange",
        "type": "(text: string) => void",
        "description": "Called as letters are locked in."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Lower `delay` for fast typists."
    ],
    "accessibility": [
      "Keys are buttons that say their letters. The number keys, * and # work on your keyboard while a key has focus, and the message is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
