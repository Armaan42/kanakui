import type { ReactNode } from "react"
import { BellRing, Database, MousePointerClick, ShieldCheck, Sparkles, Users, Zap } from "lucide-react"

import { cn } from "@/lib/utils"

const funnelSteps = [
  { step: "Visited pricing", rate: 100, users: "24,310" },
  { step: "Started checkout", rate: 58, users: "14,100" },
  { step: "Entered card", rate: 34, users: "8,265", drop: true },
  { step: "Subscribed", rate: 29, users: "7,050" },
]

/** Share of each weekly cohort still active, week 0 to week 7. */
const cohorts = [
  { week: "Sep 15", values: [100, 64, 52, 47, 44, 42, 41, 40] },
  { week: "Sep 22", values: [100, 66, 55, 49, 46, 44, 43] },
  { week: "Sep 29", values: [100, 69, 57, 51, 48, 47] },
  { week: "Oct 6", values: [100, 71, 60, 55, 52] },
  { week: "Oct 13", values: [100, 74, 63, 58] },
  { week: "Oct 20", values: [100, 76, 66] },
]

/** Events on the replay timeline, as a percentage of the session. */
const replayEvents = [
  { at: 5, type: "view" },
  { at: 14, type: "click" },
  { at: 26, type: "click" },
  { at: 37, type: "view" },
  { at: 49, type: "click" },
  { at: 63, type: "rage" },
  { at: 72, type: "error" },
  { at: 88, type: "click" },
] as const

const replayEventColor = {
  view: "bg-muted-foreground/60",
  click: "bg-saas-primary",
  rage: "bg-red-500",
  error: "bg-amber-500",
}

const moreFeatures = [
  { icon: MousePointerClick, title: "Autocapture", text: "Clicks, page views and form submits are tracked from day one, no tagging plan needed." },
  { icon: Zap, title: "Real-time", text: "Events show up in charts within seconds, so you can watch a launch as it happens." },
  { icon: Database, title: "Warehouse sync", text: "Two-way sync with your data warehouse keeps one source of truth for every team." },
  { icon: ShieldCheck, title: "Private by default", text: "Inputs are masked, IPs are dropped and data can stay in the EU. SOC 2 Type II audited." },
  { icon: BellRing, title: "Smart alerts", text: "Get a Slack message when a funnel step or a key metric moves more than usual." },
  { icon: Users, title: "Team spaces", text: "Shared dashboards, comments and saved views keep product, design and growth aligned." },
]

function Card({ className, title, text, children }: { className?: string; title: string; text: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border bg-card", className)}>
      <div className="p-6 pb-0 sm:p-8 sm:pb-0">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
      <div aria-hidden="true" className="mt-6 flex-1 p-6 pt-0 select-none sm:p-8 sm:pt-0">
        {children}
      </div>
    </div>
  )
}

export function SaasLandingFeatures() {
  return (
    <section id="features" aria-labelledby="saas-landing-features" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-saas-primary">Product</p>
          <h2 id="saas-landing-features" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            From raw events to clear answers in minutes
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Everything you need to see what users do, understand why, and decide what to build next, in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          <Card
            className="lg:col-span-3"
            title="Funnels that point at the problem"
            text="Build a funnel from any events in seconds. Pulsewise highlights the step where most people leave and who they are."
          >
            <div className="space-y-3 rounded-xl border bg-background p-4">
              {funnelSteps.map((row) => (
                <div key={row.step} className="grid grid-cols-[7.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-xs sm:grid-cols-[9rem_minmax(0,1fr)_3.5rem]">
                  <span className="truncate text-muted-foreground">{row.step}</span>
                  <div className="h-7 overflow-hidden rounded-md bg-muted">
                    <div
                      className={cn("flex h-full min-w-11 items-center rounded-md px-2 font-mono text-[11px] text-white", row.drop ? "bg-red-500" : "bg-saas-primary dark:text-neutral-950")}
                      style={{ width: `${row.rate}%` }}
                    >
                      {row.rate}%
                    </div>
                  </div>
                  <span className="text-right font-mono text-muted-foreground tabular-nums">{row.users}</span>
                </div>
              ))}
              <p className="rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-700 dark:text-red-300">
                Biggest drop-off: 41% leave at “Entered card”, mostly on mobile Safari.
              </p>
            </div>
          </Card>

          <Card
            className="lg:col-span-2"
            title="Retention you can trust"
            text="Weekly cohorts show whether changes keep people coming back, not just whether they signed up."
          >
            <div className="overflow-hidden rounded-xl border bg-background p-3">
              <div className="grid grid-cols-[3.25rem_repeat(8,minmax(0,1fr))] gap-1 font-mono text-[10px]">
                <span />
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className="text-center text-muted-foreground">
                    W{i}
                  </span>
                ))}
                {cohorts.map((cohort) => (
                  <div key={cohort.week} className="contents">
                    <span className="truncate text-muted-foreground">{cohort.week}</span>
                    {Array.from({ length: 8 }, (_, i) => {
                      const value = cohort.values[i]
                      return (
                        <span
                          key={i}
                          className="grid h-6 place-items-center rounded-sm text-foreground/80"
                          style={value === undefined ? undefined : { backgroundColor: `color-mix(in oklab, var(--saas-accent) ${Math.round(value * 0.85)}%, transparent)` }}
                        >
                          {value === undefined ? "" : value === 100 ? "" : value}
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card
            className="lg:col-span-2"
            title="Session replays, one click away"
            text="Jump from any chart to the recordings behind it and watch exactly where people hesitate."
          >
            <div className="overflow-hidden rounded-xl border bg-background text-[11px]">
              {/* Who the recording is from */}
              <div className="flex items-center gap-2.5 border-b px-3 py-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-saas-accent/15 text-[10px] font-semibold text-saas-accent">
                  JK
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">jonas.k@fernway.io</p>
                  <p className="truncate text-[10px] text-muted-foreground">Berlin · Chrome on macOS · 2 days ago</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                  Rage click
                </span>
              </div>

              {/* The recorded screen */}
              <div className="relative bg-muted/50 px-4 pt-4 pb-5">
                <div className="rounded-lg border bg-background p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Step 3 of 4</span>
                    <span>app.pulsewise.io/onboarding</span>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map((step) => (
                      <span key={step} className={cn("h-1 rounded-full", step < 3 ? "bg-saas-primary" : "bg-muted")} />
                    ))}
                  </div>
                  <p className="mt-3 text-[13px] font-semibold">Invite your teammates</p>
                  <p className="mt-0.5 text-muted-foreground">Pulsewise works best when your whole team can see it.</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="rounded-md border px-2 py-1.5">maria@fernway.io</div>
                    <div className="flex items-center rounded-md border border-saas-primary px-2 py-1.5 ring-2 ring-saas-primary/20">
                      <span className="text-muted-foreground">name@company.com</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="relative text-muted-foreground underline underline-offset-2">
                      Skip for now
                      {/* Rage-click rings, the cursor trail and the cursor itself, anchored to the link. */}
                      <span className="absolute top-1/2 left-[85%] size-8 -translate-1/2 rounded-full border-2 border-red-500/70 bg-red-500/10" />
                      <span className="absolute top-1/2 left-[85%] size-8 -translate-1/2 animate-ping rounded-full border-2 border-red-500/60 motion-reduce:hidden" />
                      <svg viewBox="0 0 160 70" className="absolute bottom-1/2 left-[85%] h-[70px] w-40 overflow-visible">
                        <path
                          d="M0 70 C18 54 40 50 70 53 S125 62 160 56"
                          fill="none"
                          stroke="var(--saas-primary)"
                          strokeWidth="1.5"
                          strokeDasharray="3 4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <svg viewBox="0 0 14 20" className="absolute top-1/2 left-[85%] h-5 w-3.5 drop-shadow">
                        <path d="M1 1v15.5l4-3.6 2.7 6 2.6-1.1-2.7-5.9H13Z" fill="white" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                      <span className="absolute top-full left-[85%] mt-3 ml-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-white no-underline shadow">
                        4 clicks in 1.2s
                      </span>
                    </span>
                    <span className="rounded-md bg-primary px-2.5 py-1.5 font-medium text-primary-foreground">Send invites</span>
                  </div>
                </div>
              </div>

              {/* Player */}
              <div className="space-y-2.5 border-t px-3 py-2.5">
                <div className="relative h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[63%] rounded-full bg-foreground/70" />
                  {replayEvents.map((event) => (
                    <span
                      key={event.at}
                      className={cn("absolute top-1/2 size-2 -translate-1/2 rounded-full ring-2 ring-background", replayEventColor[event.type])}
                      style={{ left: `${event.at}%` }}
                    />
                  ))}
                  <span className="absolute top-1/2 left-[63%] h-3.5 w-1 -translate-1/2 rounded-full bg-foreground" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <svg viewBox="0 0 12 12" className="size-2.5 fill-current">
                      <path d="M3 2v8l7-4Z" />
                    </svg>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">01:52 / 02:58</span>
                  <span className="rounded border px-1 font-mono text-[10px]">1×</span>
                  <span className="ml-auto hidden items-center gap-2.5 text-[10px] text-muted-foreground sm:flex">
                    <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-saas-primary" />Click</span>
                    <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-red-500" />Rage</span>
                    <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-amber-500" />Error</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="lg:col-span-3"
            title="Ask questions in plain English"
            text="AI Insights reads your events and answers like an analyst would, with the chart and sessions to back it up."
          >
            <div className="space-y-3 rounded-xl border bg-background p-4 text-[13px]">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground">
                Why did trial conversions drop last week?
              </div>
              <div className="flex gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-saas-primary/15 text-saas-primary">
                  <Sparkles className="size-3.5" />
                </span>
                <div className="space-y-2 rounded-2xl rounded-tl-sm border bg-muted/40 px-3.5 py-2.5">
                  <p>
                    Trial-to-paid fell from <span className="font-medium">18.4%</span> to <span className="font-medium">14.9%</span>. Two
                    things changed on Nov 4:
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>The new onboarding skips the “Invite teammates” step. Teams that invite convert 3.2× more.</li>
                    <li>Checkout errors doubled for cards issued in India (3-D Secure timeouts).</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {moreFeatures.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-card">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
