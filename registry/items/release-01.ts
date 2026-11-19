import { defineItem } from "../define.ts"

export default defineItem({
  "name": "release-01",
  "type": "registry:block",
  "title": "Music Release",
  "description": "An album page with a track list and each track’s mastering curve.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "music-equalizer"
  ],
  "files": [
    {
      "path": "registry/default/blocks/release-01/components/release-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button` and VenusUI `music-equalizer`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each track carries its own `gains`; connect them to real audio if you have a player.",
      "The people, businesses and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The section is labelled by its heading, photos have descriptions and every control works from the keyboard."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
