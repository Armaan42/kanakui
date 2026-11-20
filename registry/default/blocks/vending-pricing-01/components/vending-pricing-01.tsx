"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// The product, plans and prices are made up.
const ITEMS = [
  { code: "A1", name: "Free", note: "Plan", price: "$0", per: "forever", from: "#e0f2fe", to: "#0284c7", blurb: "For trying Lumen Notes on your own.", features: ["Up to 3 notebooks", "Sync on 2 devices", "Web clipper"] },
  { code: "A2", name: "Plus", note: "Plan", price: "$8", per: "a month", from: "#fef3c7", to: "#d97706", blurb: "For people who write every day.", features: ["Unlimited notebooks", "Sync on every device", "Offline mode", "30 days of version history"] },
  { code: "A3", name: "Team", note: "Plan", price: "$15", per: "a user a month", from: "#ede9fe", to: "#7c3aed", blurb: "For teams sharing one knowledge base.", features: ["Everything in Plus", "Shared spaces", "Admin controls", "A year of version history"] },
  { code: "B1", name: "Storage", note: "+100 GB", price: "$2", per: "a month", from: "#dcfce7", to: "#16a34a", blurb: "An add-on for files, scans and audio notes.", features: ["100 GB more space", "Buy as many as you need"] },
  { code: "B2", name: "Support", note: "Priority", price: "$20", per: "a month", from: "#ffe4e6", to: "#e11d48", blurb: "An add-on for when notes are your job.", features: ["Replies within 4 working hours", "A named contact"] },
  { code: "B3", name: "Assist", note: "AI", price: "$10", per: "a month", from: "#e2e8f0", to: "#334155", blurb: "An add-on that summarises and searches your notes.", features: ["Summaries of long notes", "Search by meaning, not just words", "Only reads your own notes"] },
]

type Item = (typeof ITEMS)[number]

/** A pricing section in a vending machine: key in a code, or tap a plan, and it drops into the tray. */
export function VendingPricing01() {
  const [entry, setEntry] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [vending, setVending] = React.useState<string | null>(null)
  const [picked, setPicked] = React.useState<Item | null>(null)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const vend = (code: string) => {
    const item = ITEMS.find((candidate) => candidate.code === code)
    if (vending) return
    if (!item) {
      setEntry("")
      setMessage(`No ${code}`)
      return
    }
    setEntry(code)
    setMessage("")
    setVending(code)
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    timer.current = window.setTimeout(
      () => {
        setVending(null)
        setPicked(item)
        setEntry("")
      },
      still ? 0 : 1100
    )
  }

  const press = (key: string) => {
    if (vending) return
    setMessage("")
    if (key === "CLR") return setEntry("")
    if (/[AB]/.test(key)) return setEntry(key)
    if (!entry) return setMessage("Row first")
    vend(entry + key)
  }

  const screen = vending ? `${vending} ${ITEMS.find((item) => item.code === vending)?.price}` : message || (entry ? `${entry}_` : "Select")

  return (
    <section aria-labelledby="vending-pricing-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="vending-pricing-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick a plan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Key in a code or tap a plan. Row A is plans, row B is add-ons. Everything is monthly and you can cancel at any time.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* The machine. */}
          <div className="rounded-[1.75rem] bg-linear-to-b from-slate-700 via-slate-800 to-slate-950 p-3 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.15)] sm:p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-3 sm:grid-cols-[minmax(0,1fr)_7rem]">
              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-2 shadow-[inset_0_4px_14px_rgb(0_0_0/0.8)] sm:p-3">
                {(["A", "B"] as const).map((row) => (
                  <div key={row} className="grid grid-cols-3 gap-2 border-b-4 border-slate-600 pt-2 pb-1 last:mt-3 sm:gap-3">
                    {ITEMS.filter((item) => item.code.startsWith(row)).map((item) => {
                      const dropping = vending === item.code
                      return (
                        <div key={item.code} className="flex min-w-0 flex-col items-center">
                          <button
                            key={dropping ? "drop" : "rest"}
                            type="button"
                            onClick={() => vend(item.code)}
                            aria-label={`${item.code}: ${item.name} ${item.note === "Plan" ? "plan" : `add-on, ${item.note}`}, ${item.price} ${item.per}`}
                            className={cn(
                              "relative z-10 flex h-20 w-full max-w-24 flex-col justify-between rounded-md p-2 text-left shadow-[0_4px_8px_rgb(0_0_0/0.5)] outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-sky-400 sm:h-24",
                              dropping && "animate-vending-pricing-01-drop motion-reduce:animate-none"
                            )}
                            style={{ background: `linear-gradient(160deg, ${item.from}, ${item.to})` }}
                          >
                            <span className="text-[10px] font-semibold tracking-wider text-black/60 uppercase">{item.note}</span>
                            <span className="text-sm leading-none font-bold text-black/85 sm:text-base">{item.name}</span>
                            <span aria-hidden="true" className="absolute inset-y-1 right-1 w-1.5 rounded-full bg-white/40" />
                          </button>
                          {/* The coil the item sits on. */}
                          <svg aria-hidden="true" viewBox="0 0 64 10" className="-mt-1 h-3 w-full max-w-24 overflow-visible">
                            <path
                              d="M0 5 q4 -6 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0"
                              fill="none"
                              stroke="#cbd5e1"
                              strokeWidth="1.6"
                              className={cn(dropping && "animate-vending-pricing-01-coil motion-reduce:animate-none")}
                            />
                          </svg>
                          <span className="mt-1 rounded-sm bg-slate-200 px-1.5 font-mono text-[10px] leading-4 text-slate-900 tabular-nums">
                            {item.code} {item.price}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-120 from-white/12 via-transparent to-transparent" />
              </div>

              {/* Keypad. */}
              <div className="flex flex-col gap-2">
                <output aria-live="polite" className="block truncate rounded-md bg-lime-950 px-2 py-2 text-center font-mono text-sm tracking-widest text-lime-300 uppercase shadow-[inset_0_2px_6px_rgb(0_0_0/0.6)]">
                  {screen}
                </output>
                <div className="grid grid-cols-3 gap-1.5">
                  {["A", "B", "CLR", "1", "2", "3"].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => press(key)}
                      aria-label={key === "CLR" ? "Clear" : `Key ${key}`}
                      className="grid h-8 place-items-center rounded-md bg-linear-to-b from-slate-200 to-slate-400 font-mono text-xs font-bold text-slate-900 shadow-[0_2px_0_#334155] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 sm:h-9"
                    >
                      {key}
                    </button>
                  ))}
                </div>
                <span aria-hidden="true" className="mx-auto mt-1 h-8 w-2 rounded-full bg-slate-950 shadow-[inset_0_2px_3px_rgb(0_0_0/0.9)]" />
                <span aria-hidden="true" className="text-center text-[9px] tracking-widest text-slate-400 uppercase">Coins</span>
              </div>
            </div>

            {/* Tray. */}
            <div className="mt-3 flex h-16 items-center gap-3 rounded-xl bg-slate-950 px-4 shadow-[inset_0_6px_12px_rgb(0_0_0/0.8)]">
              {picked ? (
                <span
                  key={picked.code}
                  aria-hidden="true"
                  className="h-9 w-20 animate-vending-pricing-01-land rounded-md shadow-[0_3px_6px_rgb(0_0_0/0.6)] motion-reduce:animate-none"
                  style={{ background: `linear-gradient(160deg, ${picked.from}, ${picked.to})` }}
                />
              ) : null}
              <span aria-hidden="true" className="ml-auto text-[10px] font-semibold tracking-[0.3em] text-slate-400 uppercase">Push</span>
            </div>
          </div>

          {/* What dropped. */}
          <div aria-live="polite" className="rounded-2xl border p-6 sm:p-8">
            {picked ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {picked.code} · {picked.note === "Plan" ? "Plan" : "Add-on"}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{picked.name}{picked.note !== "Plan" ? ` (${picked.note})` : ""}</h3>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tabular-nums">{picked.price}</span>
                  <span className="text-sm text-muted-foreground">{picked.per}</span>
                </p>
                <p className="mt-3 text-muted-foreground">{picked.blurb}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {picked.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-8 w-full">
                  {picked.note === "Plan" ? `Start with ${picked.name}` : `Add ${picked.name}`}
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">Nothing in the tray yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Press A then a number for a plan, or B then a number for an add-on.</p>
                <dl className="mt-6 divide-y text-sm">
                  {ITEMS.map((item) => (
                    <div key={item.code} className="flex items-center justify-between gap-4 py-2.5">
                      <dt>
                        <span className="mr-2 font-mono text-xs text-muted-foreground">{item.code}</span>
                        {item.name}
                        {item.note !== "Plan" ? <span className="text-muted-foreground"> ({item.note})</span> : null}
                      </dt>
                      <dd className="tabular-nums">
                        {item.price} <span className="text-muted-foreground">{item.per}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
