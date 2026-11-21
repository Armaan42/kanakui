import { CalendarDays, CreditCard, GitPullRequest, MessageCircle } from "lucide-react"

import { NotificationStack } from "@/registry/default/ui/notification-stack"

export const meta = {
  title: "Dashboard notifications",
  description: "The notification stack in the corner of a team dashboard, collapsed until hovered or opened.",
}

// The workspace, people and events are made up.
export default function TeamDashboard() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Good morning, Lena</h1>
        <p className="mt-1 text-sm text-muted-foreground">Thursday, 20 November · 3 meetings, 6 tasks due</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Open tasks", "14"],
            ["Reviews waiting", "3"],
            ["Shipped this week", "9"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <section aria-labelledby="today" className="mt-6 rounded-xl border bg-card">
          <h2 id="today" className="border-b px-4 py-3 font-medium">
            Today
          </h2>
          <ul className="divide-y text-sm">
            {["10:00 · Design review with Mei", "13:30 · Vendor call, Q3 contracts", "16:00 · Release planning"].map((item) => (
              <li key={item} className="px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <NotificationStack
        heading="Notifications"
        notifications={[
          { id: "1", app: "Comments", title: "Tomás Rivera", body: "Left 3 comments on “Checkout redesign”.", time: "2m", icon: <MessageCircle />, iconClassName: "bg-sky-600" },
          { id: "2", app: "Reviews", title: "Pull request ready", body: "Mei asked you to review “Billing page”.", time: "18m", icon: <GitPullRequest />, iconClassName: "bg-violet-600" },
          { id: "3", app: "Calendar", title: "Design review", body: "Starts at 10:00 in Room 4B.", time: "1h", icon: <CalendarDays />, iconClassName: "bg-rose-600" },
          { id: "4", app: "Billing", title: "Invoice paid", body: "INV-2041 for $96.00 was paid.", time: "3h", icon: <CreditCard />, iconClassName: "bg-emerald-600" },
        ]}
      />
    </div>
  )
}
