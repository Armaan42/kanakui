import { ArrowRight, Check, Globe2, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HoloCard } from "@/registry/default/ui/holo-card"

const benefits = [
  { icon: Sparkles, title: "2% back on everything", text: "Paid out daily, straight to your balance." },
  { icon: Globe2, title: "No fees abroad", text: "Spend in 150+ currencies at the real exchange rate." },
  { icon: ShieldCheck, title: "Freeze in one tap", text: "Lost it? Lock it from the app, then unlock it when it turns up." },
]

/** A product hero for a payment card: benefits on the left, the card on the right. */
export function Hero12() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 right-0 -z-10 h-[32rem] w-[48rem] translate-x-1/4 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            New: the metal edition
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">The card that pays you back, everywhere.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
            Aurora is a debit card for people who travel, shop and split bills. No annual fee, no hidden charges, and money
            back on every purchase.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border bg-card">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-sm text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Get the card <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">See how it works</a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No annual fee · Apply in 3 minutes · Won’t affect your credit score</p>
        </div>

        <div className="relative mx-auto w-full max-w-md py-10">
          {/* A second card behind, for depth. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] top-[4%] aspect-[1.586] rotate-[-9deg] rounded-[4.5%/7%] bg-linear-to-br from-violet-300 via-fuchsia-200 to-amber-100 opacity-70 shadow-xl dark:from-violet-900 dark:via-fuchsia-900 dark:to-amber-900"
          />
          <HoloCard className="relative rotate-[4deg]" name="Alex Rivera" last4="0427" expires="11/29" brand="Aurora" />

          <div className="absolute -bottom-2 -left-2 flex items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 text-sm shadow-lg backdrop-blur sm:-left-8">
            <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Check aria-hidden="true" className="size-4" />
            </span>
            <span>
              <span className="block font-medium tabular-nums">+$12.40</span>
              <span className="block text-xs text-muted-foreground">cashback today</span>
            </span>
          </div>
          <div className="absolute -top-1 -right-2 rounded-xl border bg-background/90 px-3 py-2 text-sm shadow-lg backdrop-blur sm:-right-6">
            <span className="block font-medium">¥4,800 · Kyoto</span>
            <span className="block text-xs text-muted-foreground">No FX fee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
