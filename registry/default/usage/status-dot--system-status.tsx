import { StatusDot } from "@/registry/default/ui/status-dot"

export const meta = {
  title: "System status page",
  description: "Status dots on a public status page: one per service, with the incident that explains the amber one.",
}

// The services and incident are made up.
const SERVICES = [
  { name: "Dashboard", status: "online", note: "Operational" },
  { name: "API", status: "online", note: "Operational" },
  { name: "Webhooks", status: "away", note: "Delayed by up to 4 minutes" },
  { name: "Email delivery", status: "online", note: "Operational" },
  { name: "File uploads", status: "online", note: "Operational" },
] as const

export default function SystemStatus() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">status.northlight.example</p>
      <h1 className="mt-1 flex items-center gap-3 text-2xl font-semibold tracking-tight">
        <StatusDot status="away" label={false} pulse />
        Webhooks are delayed
      </h1>
      <p className="mt-2 text-muted-foreground">Everything else is working normally.</p>

      <ul className="mt-8 divide-y rounded-xl border bg-card">
        {SERVICES.map((service) => (
          <li key={service.name} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="font-medium">{service.name}</span>
            <span className="flex items-center gap-2 text-muted-foreground">
              {service.note}
              <StatusDot status={service.status} label={false} />
            </span>
          </li>
        ))}
      </ul>

      <section aria-labelledby="incident" className="mt-8">
        <h2 id="incident" className="font-semibold">
          Current incident
        </h2>
        <ol className="mt-3 space-y-4 border-l pl-5 text-sm">
          <li>
            <p className="font-medium">Monitoring · 10:42 UTC</p>
            <p className="text-muted-foreground">A fix is out and the queue is draining. Delivery times are back under a minute for new events.</p>
          </li>
          <li>
            <p className="font-medium">Identified · 10:05 UTC</p>
            <p className="text-muted-foreground">One of three webhook workers stopped picking up jobs after a config change. We&apos;ve rolled it back.</p>
          </li>
        </ol>
      </section>
    </div>
  )
}
