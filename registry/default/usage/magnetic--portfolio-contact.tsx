import { ArrowUpRight } from "lucide-react"

import { Magnetic } from "@/registry/default/ui/magnetic"

export const meta = {
  title: "Portfolio contact section",
  description: "A magnetic call-to-action at the end of a designer's portfolio, pulling gently toward the pointer.",
}

// The designer and clients are made up.
export default function PortfolioContact() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm text-muted-foreground">Mei Lin · product designer, Lisbon</p>
      <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Have a product that needs a calmer interface?</h2>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        I take on two projects a quarter. Next opening is February, for dashboards, booking flows and anything with a lot of settings.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Magnetic>
          <a
            href="mailto:mei@example.com"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-foreground px-7 text-base font-medium text-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Start a project
            <ArrowUpRight aria-hidden="true" className="size-5" />
          </a>
        </Magnetic>
        <span className="text-sm text-muted-foreground">Replies within two working days.</span>
      </div>
      <dl className="mt-16 grid gap-6 border-t pt-8 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Recent clients</dt>
          <dd className="mt-1">Paperkite Libraries, Tidewell, Halden Goods</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Typical project</dt>
          <dd className="mt-1">6–10 weeks, research to handoff</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Elsewhere</dt>
          <dd className="mt-1">Case studies · Reading list · Newsletter</dd>
        </div>
      </dl>
    </section>
  )
}
