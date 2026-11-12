import { ArrowRight, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SaasLandingDashboard } from "./saas-landing-dashboard"
import { heroAvatars, portrait } from "./saas-landing-media"

export function SaasLandingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Grid and glow behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_100%)]"
      />
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 h-112 w-4xl -translate-x-1/2 rounded-full bg-saas-primary/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pt-16 text-center sm:px-6 sm:pt-24">
        <a
          href="#features"
          className="group inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1 text-xs shadow-sm backdrop-blur outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-sm"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">New</span>
          <span className="text-muted-foreground">AI Insights explains every drop-off</span>
          <ArrowRight aria-hidden="true" className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
          Know exactly why users stay, and why they leave.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
          Pulsewise turns raw product events into funnels, retention cohorts and session replays your whole team can
          read. Set it up in ten minutes. No SQL required.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href="#pricing">
              Start your 14-day trial
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <a href="#">Book a demo</a>
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
          {["No credit card required", "SOC 2 Type II", "GDPR ready"].map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3.5 text-saas-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex -space-x-2">
            {heroAvatars.map((id) => (
              <img
                key={id}
                src={portrait(id, 80)}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <div className="text-left text-sm">
            <div className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">4.9 out of 5</span> from 2,400+ product teams
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl px-4 pb-20 sm:mt-16 sm:px-6 sm:pb-28">
        <SaasLandingDashboard />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>
    </section>
  )
}
