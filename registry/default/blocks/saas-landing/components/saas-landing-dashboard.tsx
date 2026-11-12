import {
  BarChart3,
  ChevronDown,
  FlaskConical,
  Gauge,
  PlayCircle,
  Repeat,
  Settings,
  Share2,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"

/** Daily active users (thousands) for the last 30 days: this period and the one before. */
const current = [31, 33, 32, 35, 38, 36, 34, 37, 40, 42, 41, 39, 43, 46, 45, 44, 47, 50, 49, 48, 52, 54, 53, 51, 55, 58, 57, 56, 60, 62]
const previous = [28, 29, 31, 30, 32, 31, 30, 32, 33, 35, 34, 33, 34, 36, 35, 35, 37, 38, 37, 36, 38, 39, 39, 38, 40, 41, 40, 40, 42, 43]

const CHART_W = 600
const CHART_H = 180
const MAX = 70

function linePath(values: number[]) {
  const step = CHART_W / (values.length - 1)
  return values
    .map((value, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(CHART_H - (value / MAX) * CHART_H).toFixed(1)}`)
    .join(" ")
}

const currentLine = linePath(current)
const currentArea = `${currentLine} L${CHART_W},${CHART_H} L0,${CHART_H} Z`
const previousLine = linePath(previous)

const kpis = [
  { label: "Weekly active users", value: "48,219", change: "+12.4%", up: true },
  { label: "Activation rate", value: "41.8%", change: "+3.1 pts", up: true },
  { label: "Avg. session", value: "6m 42s", change: "+8.0%", up: true },
  { label: "Monthly churn", value: "2.3%", change: "−0.4 pts", up: false, good: true },
]

const funnel = [
  { step: "Signed up", users: 12480, rate: 100 },
  { step: "Created a project", users: 8236, rate: 66 },
  { step: "Invited a teammate", users: 5101, rate: 41 },
  { step: "Activated", users: 3894, rate: 31 },
]

const nav = [
  { label: "Overview", icon: Gauge, active: true },
  { label: "Funnels", icon: BarChart3 },
  { label: "Retention", icon: Repeat },
  { label: "Replays", icon: PlayCircle },
  { label: "Experiments", icon: FlaskConical },
  { label: "Settings", icon: Settings },
]

/**
 * A static, realistic screen of the product. It's built with HTML so it
 * stays sharp and follows the theme; replace it with a real screenshot if
 * you prefer. Screen readers get one description instead of the details.
 */
export function SaasLandingDashboard({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="The Pulsewise overview dashboard: weekly active users up 12.4%, an activation funnel and an AI insight about an Android drop-off."
      className={cn(
        "overflow-hidden rounded-xl border bg-card text-left text-card-foreground shadow-2xl shadow-black/10 ring-1 ring-foreground/5 select-none dark:shadow-black/40",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="mx-auto truncate rounded-md border bg-background px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
          app.pulsewise.io/acme/overview
        </span>
      </div>

      <div className="grid md:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-1 border-r bg-muted/20 p-3 md:flex">
          <div className="mb-2 flex items-center gap-2 rounded-md border bg-background px-2 py-1.5 text-xs font-medium">
            <span className="grid size-5 place-items-center rounded bg-saas-accent text-[10px] font-semibold text-white">A</span>
            Acme Inc.
            <ChevronDown className="ml-auto size-3.5 text-muted-foreground" />
          </div>
          {nav.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                active ? "bg-background font-medium shadow-sm ring-1 ring-border" : "text-muted-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </div>
          ))}
          <div className="mt-auto rounded-lg border bg-background p-3">
            <p className="text-xs font-medium">Replays: 3,412 of 5,000</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Resets in 9 days</p>
          </div>
        </aside>

        <div className="min-w-0 space-y-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">Activation overview</p>
            <span className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground">Last 30 days</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px]">
              <Share2 className="size-3" /> Share
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((kpi) => {
              const positive = kpi.up || kpi.good
              const Trend = kpi.up ? TrendingUp : TrendingDown
              return (
                <div key={kpi.label} className="rounded-lg border bg-background p-3">
                  <p className="truncate text-[11px] text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums">{kpi.value}</p>
                  <p
                    className={cn(
                      "mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium tabular-nums",
                      positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    )}
                  >
                    <Trend className="size-3" />
                    {kpi.change}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <div className="rounded-lg border bg-background p-3">
              <div className="flex items-center gap-3 text-[11px]">
                <p className="font-medium">Daily active users</p>
                <span className="ml-auto inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-2 rounded-full bg-saas-primary" /> This period
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-0.5 w-3 rounded-full bg-muted-foreground/50" /> Previous
                </span>
              </div>
              <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" className="mt-3 h-36 w-full sm:h-44">
                <defs>
                  <linearGradient id="saas-landing-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--saas-primary)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--saas-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((y) => (
                  <line key={y} x1="0" x2={CHART_W} y1={CHART_H * y} y2={CHART_H * y} stroke="var(--border)" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                ))}
                <path d={previousLine} fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                <path d={currentArea} fill="url(#saas-landing-area)" />
                <path d={currentLine} fill="none" stroke="var(--saas-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Oct 14</span>
                <span>Oct 21</span>
                <span>Oct 28</span>
                <span>Nov 4</span>
                <span>Nov 12</span>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-3">
              <p className="text-[11px] font-medium">Activation funnel</p>
              <ul className="mt-3 space-y-3">
                {funnel.map((row) => (
                  <li key={row.step}>
                    <div className="flex items-baseline justify-between gap-2 text-[11px]">
                      <span className="truncate">{row.step}</span>
                      <span className="font-mono text-muted-foreground tabular-nums">{row.users.toLocaleString("en-US")}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-saas-accent" style={{ width: `${row.rate}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">31.2%</span> convert in 7 days
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-saas-primary/30 bg-saas-primary/5 p-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-saas-primary/15 text-saas-primary">
              <Sparkles className="size-3.5" />
            </span>
            <p className="text-[12px] leading-5">
              <span className="font-medium">Activation fell 6% on Android after v4.2.</span>{" "}
              <span className="text-muted-foreground">
                71% of the drop-offs happen on the notification permission screen. 214 sessions to watch.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
