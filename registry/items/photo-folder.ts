import { defineItem } from "../define.ts"

export default defineItem({
  name: "photo-folder",
  type: "registry:ui",
  title: "Photo Folder",
  description: "A folder that opens on hover and fans out the photos inside it.",
  version: "0.1.0",
  releasedAt: "2026-11-15",
  categories: ["interactive", "cards", "animations"],
  files: [{ path: "registry/default/ui/photo-folder.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "images", type: "{ src: string; alt: string }[]", description: "Photos in the folder. Up to five fan out; the count includes all of them." },
      { name: "label", type: "string", description: "Folder name, shown under it and used as its accessible name." },
      { name: "description", type: "string", description: "Second line under the name. Defaults to the number of photos." },
      { name: "color", type: "string", default: "\"#d8b878\"", description: "Folder color: any CSS color. The back and the lighter top of the flap are mixed from it." },
      { name: "open", type: "boolean", description: "Controlled open state. Leave unset to open on hover and toggle on click." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when hovering or clicking opens or closes the folder." },
    ],
    extends: "All `<button>` props except `children`, e.g. `onClick` to open a gallery.",
    requirements: ["React 19 and Tailwind CSS v4."],
    customization: [
      "Size it with a width class, e.g. `className=\"w-44\"`; the folder keeps a 5:4 shape.",
      "Leave room above it (about 60% of its height): the photos fan out over the top.",
      "Use `onClick` (or wrap your own logic around `open`) to open a full gallery when the folder is clicked.",
    ],
    accessibility: [
      "It’s a button with `aria-expanded`, named after the folder and its photo count; the photos’ `alt` texts are its description.",
      "Hover opens it; a click, tap, Enter or Space keeps it open or closes it, so touch and keyboard users can open it too.",
      "With reduced motion the photos and flap move without animation.",
    ],
    troubleshooting: [
      {
        problem: "The fanned-out photos are cut off.",
        solution: "A parent has `overflow-hidden`, or there’s too little space above the folder. Add top padding or margin.",
      },
    ],
  },
})
