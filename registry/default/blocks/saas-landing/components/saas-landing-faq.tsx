import { ChevronDown, MessageCircle } from "lucide-react"

import { portrait } from "./saas-landing-media"

const faqs = [
  {
    question: "How long does setup take?",
    answer:
      "Most teams send their first events in under ten minutes with our JavaScript, iOS, Android or React Native SDK. Autocapture records clicks, page views and form submits without extra code, and you can add custom events whenever you're ready.",
  },
  {
    question: "Will Pulsewise slow down my site or app?",
    answer:
      "No. The web SDK is 9 KB gzipped, loads asynchronously and sends events in batches, so it never blocks rendering. On mobile, events are queued and sent when the device is on a good connection.",
  },
  {
    question: "How do you handle privacy and GDPR?",
    answer:
      "Text inputs are masked in replays by default, IP addresses are dropped after geolocation, and you can host your data in the EU. We sign a DPA with every customer, support a cookieless mode and are SOC 2 Type II audited.",
  },
  {
    question: "What counts as a monthly tracked user?",
    answer:
      "A unique person who sends at least one event in a calendar month. Anonymous visitors who later sign up are merged, so they count once. Going over your plan never stops tracking; we'll suggest a plan change instead.",
  },
  {
    question: "Can I bring my existing data?",
    answer:
      "Yes. Import historical events from a CSV file or straight from your data warehouse, and keep your current tracking running in parallel while your team compares the numbers.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Monthly plans end at the close of the billing period, and yearly plans can be cancelled for a prorated refund in the first 30 days. You can export all of your data whenever you like.",
  },
]

const supportTeam = ["1534528741775-53994a69daeb", "1519085360753-af0119f7cbe7", "1531123897727-8f129e1688ce"]

export function SaasLandingFaq() {
  return (
    <section id="faq" aria-labelledby="saas-landing-faq" className="scroll-mt-16 border-t py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-saas-primary">FAQ</p>
          <h2 id="saas-landing-faq" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Can’t find what you’re looking for? Our product specialists reply in under five minutes during working
            hours.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {supportTeam.map((id) => (
                <img
                  key={id}
                  src={portrait(id, 80)}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="size-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              Chat with us
            </a>
          </div>
        </div>

        <div className="divide-y border-y">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-5 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
