import { defineItem } from "../define.ts"

export default defineItem({
  name: "blur-text",
  type: "registry:ui",
  title: "Blur Text",
  description: "Text whose words rise out of a blur one after another.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["text","animations"],
  files: [{ path: "registry/default/ui/blur-text.tsx", type: "registry:ui" }],
  cssVars: { theme: {"animate-blur-in":"blur-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"} },
  css: {"@keyframes blur-in":{"from":{"opacity":"0","filter":"blur(12px)","transform":"translateY(0.35em)"},"to":{"opacity":"1","filter":"blur(0)","transform":"none"}}},
  pageDocs: {
    props: [{"name":"text","type":"string","description":"The text to reveal. Required."},{"name":"as","type":"\"h1\" | \"h2\" | \"h3\" | \"p\" | \"span\"","default":"\"p\"","description":"Element to render."},{"name":"delay","type":"number","default":"0","description":"Milliseconds before the first word."},{"name":"stagger","type":"number","default":"90","description":"Milliseconds between words."}],
    extends: "Only the props above, plus `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `blur-in` keyframes. Works in Server Components and without JavaScript."],
    customization: ["Chain several with `delay` so a paragraph starts after the heading."],
    accessibility: ["The text stays plain text for screen readers and search engines.","With reduced motion the words appear at once."],
    troubleshooting: [{"problem":"It only plays once.","solution":"It plays on load, by design. Change the `key` to replay it."}],
  },
})
