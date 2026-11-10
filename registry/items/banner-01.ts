import { defineItem } from "../define.ts"

export default defineItem({
  name: "banner-01",
  type: "registry:block",
  title: "Announcement Banner",
  description: "A slim announcement bar with a link and a dismiss button.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["banners"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/banner-01/components/banner-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Dismissal lasts for the visit. Store it in `localStorage` to keep it hidden.","Place it above your navbar."],
    accessibility: ["A labelled region; the dismiss button is named “Dismiss announcement”."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
