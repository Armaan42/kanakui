import { AccordionSmooth } from "@/registry/default/ui/accordion-smooth"

// Placeholder answers. Replace them with your real policies.
const left = [
  { id: "trial", title: "Is there a free trial?", content: "Yes. Every paid plan starts with a 14-day trial, no card required." },
  { id: "switch", title: "Can I switch plans later?", content: "Any time. Changes apply from your next billing date." },
  { id: "team", title: "Can I invite my team?", content: "Yes. Invite people by email and choose what they can access." },
]
const right = [
  { id: "data", title: "Where is my data stored?", content: "Describe your hosting regions and data practices here." },
  { id: "export", title: "Can I export my data?", content: "Yes. Export everything as CSV or JSON from settings." },
  { id: "support", title: "How do I get help?", content: "Email support any time. Paid plans get priority replies." },
]

/** Six questions in two smooth accordions, side by side on large screens. */
export function Faq02() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <AccordionSmooth items={left} />
          <AccordionSmooth items={right} />
        </div>
      </div>
    </section>
  )
}
