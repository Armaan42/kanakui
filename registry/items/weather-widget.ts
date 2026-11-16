import { defineItem } from "../define.ts"

export default defineItem({
  "name": "weather-widget",
  "type": "registry:ui",
  "title": "Weather Widget",
  "description": "A weather widget with a live sky: turning sun rays, drifting clouds, falling rain or snow, and twinkling stars.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "data-display",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/weather-widget.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-weather-drift": "weather-drift 40s linear infinite",
      "animate-weather-fall": "weather-fall 1s linear infinite"
    }
  },
  "css": {
    "@keyframes weather-drift": {
      "from": {
        "transform": "translateX(-110%)"
      },
      "to": {
        "transform": "translateX(420%)"
      }
    },
    "@keyframes weather-fall": {
      "from": {
        "transform": "translateY(-20px)",
        "opacity": "0"
      },
      "10%": {
        "opacity": "1"
      },
      "to": {
        "transform": "translateY(380px)",
        "opacity": "0.2"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "city",
        "type": "string",
        "description": "Shown at the top and in the section's label."
      },
      {
        "name": "condition",
        "type": "\"sunny\" | \"cloudy\" | \"rain\" | \"snow\" | \"night\"",
        "description": "Sets the sky and the animation."
      },
      {
        "name": "temperature, high, low",
        "type": "number",
        "description": "In whatever unit you use."
      },
      {
        "name": "summary",
        "type": "string",
        "description": "Short description; defaults to the condition's name."
      },
      {
        "name": "forecast",
        "type": "{ day; condition; high; low }[]",
        "description": "Up to five days, shown on frosted glass."
      }
    ],
    "extends": "All `<section>` props.",
    "requirements": [
      "`lucide-react` for the forecast icons. React 19 and Tailwind CSS v4. The CLI adds the `weather-drift` and `weather-fall` keyframes."
    ],
    "customization": [
      "Map your weather API's codes to the five conditions. Rain and snow positions are fixed per drop, so the server and browser render the same scene."
    ],
    "accessibility": [
      "A labelled section (“Weather in Lisbon”); the sky is decorative and the forecast icons have text names.",
      "With reduced motion the scene is still."
    ],
    "troubleshooting": [
      {
        "problem": "Rain or clouds don't move.",
        "solution": "Check that the `weather-*` keyframes are in your CSS; the CLI adds them."
      }
    ]
  }
})
