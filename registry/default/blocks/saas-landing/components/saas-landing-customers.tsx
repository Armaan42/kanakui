import { ArrowRight, Quote } from "lucide-react"

import { photos, portrait } from "./saas-landing-media"

const results = [
  { value: "+38%", label: "activation in 60 days" },
  { value: "3×", label: "faster product analysis" },
  { value: "11 hrs", label: "saved per analyst, weekly" },
]

const testimonials = [
  {
    quote: "We replaced three tools and a weekly SQL ritual with Pulsewise. The funnel view alone paid for the year.",
    name: "Priya Natarajan",
    role: "Head of Growth, Fernway",
    photo: "1494790108377-be9c29b29330",
  },
  {
    quote: "Setup took one coffee. By lunch we knew why trial users never invited their team, and we shipped the fix that week.",
    name: "Marcus Reid",
    role: "Co-founder, Kestrel",
    photo: "1507003211169-0a1dd7228f2d",
  },
  {
    quote: "Having the replay right next to the funnel step is the killer feature. I watch the exact moment people get stuck.",
    name: "Sofie Lindqvist",
    role: "Senior Product Designer, Oakline",
    photo: "1438761681033-6461ffad8d80",
  },
  {
    quote: "EU data residency and input masking out of the box. Our security review took a day, not a quarter.",
    name: "David Brenner",
    role: "CTO, Quanta Health",
    photo: "1472099645785-5658abf4ff4e",
  },
  {
    quote: "AI Insights flagged an Android regression before our crash reporting did. It's like having an analyst on every squad.",
    name: "Amara Osei",
    role: "Product Manager, Northwind",
    photo: "1580489944761-15a19d654956",
  },
  {
    quote: "The warehouse stays our source of truth, and PMs finally answer their own questions instead of queuing dashboards.",
    name: "Tomás Alvarez",
    role: "Data Lead, Brightloop",
    photo: "1506794778202-cad84cf45f1d",
  },
]

export function SaasLandingCustomers() {
  return (
    <section id="customers" aria-labelledby="saas-landing-customers" className="scroll-mt-16 border-t bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-saas-primary">Customers</p>
          <h2 id="saas-landing-customers" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Teams ship better products with Pulsewise
          </h2>
        </div>

        {/* Case study */}
        <figure className="mt-14 grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-full">
            <img
              src={photos.caseStudy}
              alt="Two members of the Brightloop product team celebrating with a high five at their desks."
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Case study · Brightloop
            </span>
          </div>
          <div className="flex flex-col p-8 sm:p-12">
            <Quote aria-hidden="true" className="size-8 text-saas-primary" />
            <blockquote className="mt-6 text-xl leading-8 font-medium tracking-tight text-pretty sm:text-2xl sm:leading-9">
              “We knew people were leaving during onboarding but not why. In one afternoon with Pulsewise we found the
              step, watched the sessions and fixed it. Activation is up 38% since.”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <img
                src={portrait("1573496359142-b8d87734a5a2", 112)}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="size-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">Elena Marsh</p>
                <p className="text-muted-foreground">VP of Product, Brightloop</p>
              </div>
            </figcaption>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-8">
              {results.map((result) => (
                <div key={result.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{result.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">{result.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#"
              className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Read the Brightloop story
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </figure>

        {/* Testimonials */}
        <ul className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <li key={item.name} className="mb-6 break-inside-avoid">
              <figure className="rounded-2xl border bg-card p-6">
                <blockquote className="text-sm leading-6">“{item.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img
                    src={portrait(item.photo)}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="size-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
