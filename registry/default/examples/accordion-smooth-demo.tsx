import { AccordionSmooth } from "@/registry/default/ui/accordion-smooth"

export default function AccordionSmoothDemo() {
  return (
    <AccordionSmooth
      className="max-w-md"
      defaultOpen={["install"]}
      items={[
        { id: "install", title: "How do I install a component?", content: "Run the install command shown on its page. The shadcn CLI adds the files for you." },
        { id: "license", title: "Can I use it in client work?", content: "Yes. Free components are MIT licensed." },
        { id: "update", title: "How do I update a component?", content: "Re-run the install command with --overwrite after committing your changes." },
      ]}
    />
  )
}
