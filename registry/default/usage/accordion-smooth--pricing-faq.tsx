import { AccordionSmooth } from "@/registry/default/ui/accordion-smooth"

export const meta = {
  title: "Pricing page FAQ",
  description: "The smooth accordion as the FAQ under a pricing page, with a contact line for questions it doesn't answer.",
}

// The product and policies are made up.
const ITEMS = [
  { id: "trial", title: "Is there a free trial?", content: "Yes. Every paid plan starts with 14 days free, and you only add a card when you decide to stay." },
  { id: "seats", title: "How are seats counted?", content: "Anyone who can sign in counts as a seat. Guests who only view shared dashboards are free." },
  { id: "switch", title: "Can I switch between monthly and yearly?", content: "Any time, from Settings, then Billing. Moving to yearly takes effect today and we credit what's left of the month." },
  { id: "cancel", title: "What happens if I cancel?", content: "Your workspace stays readable for 90 days so you can export everything. After that it's deleted." },
  { id: "invoice", title: "Can you invoice us instead of charging a card?", content: "On the Business plan, yes. We send an invoice with 30-day terms." },
]

export default function PricingFaq() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.6fr]">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Questions about plans</h2>
        <p className="mt-3 text-muted-foreground">
          Something else? Write to <a href="mailto:billing@northlight.example" className="font-medium text-foreground underline underline-offset-4">billing@northlight.example</a> and a person replies within a working day.
        </p>
      </div>
      <AccordionSmooth items={ITEMS} defaultOpen={["trial"]} />
    </section>
  )
}
