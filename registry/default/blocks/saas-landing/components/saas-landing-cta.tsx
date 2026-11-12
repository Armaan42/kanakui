import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { photos } from "./saas-landing-media"

/** Sits on a photo with a dark overlay, so its colors are fixed rather than themed. */
export function SaasLandingCta() {
  return (
    <section aria-labelledby="saas-landing-cta" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-neutral-950">
        <img
          src={photos.cta}
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover opacity-60"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />

        <div className="max-w-xl px-8 py-16 sm:px-14 sm:py-20">
          <h2 id="saas-landing-cta" className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Your users are already telling you what to build.
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-300">
            Start listening today. Free for 14 days, with every Growth feature included and help from a real person
            whenever you need it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="bg-white text-neutral-950 hover:bg-white/90" asChild>
              <a href="#pricing">
                Start your free trial
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/15"
              asChild
            >
              <a href="#">Book a demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
