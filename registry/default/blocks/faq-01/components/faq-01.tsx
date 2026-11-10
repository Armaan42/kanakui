import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Is there a free plan?",
    answer: "Yes. The free plan covers personal projects with no time limit. Upgrade when you need more.",
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes. Cancel from your account settings and you keep access until the end of the billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Replace this with your actual refund policy, including how long customers have to ask.",
  },
  {
    question: "How do I get support?",
    answer: "Email us any time. Paid plans get a reply within one business day.",
  },
  {
    question: "Can I use it for client work?",
    answer: "Explain your license terms here, in plain language.",
  },
]

/**
 * Frequently asked questions as native disclosure widgets (`details`/`summary`):
 * keyboard and screen reader support come from the browser, and it works
 * without JavaScript. The plus icon turns into a cross when open.
 */
export function Faq01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Questions & answers</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Can’t find what you’re looking for? <a href="#" className="underline underline-offset-4">Contact us</a>.
          </p>
        </div>
        <div className="divide-y border-y">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                {faq.question}
                <Plus
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="pr-8 pb-4 text-pretty text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
