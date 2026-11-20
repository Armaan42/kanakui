"use client"

import * as React from "react"

import { ToggleSwitch } from "@/registry/default/ui/toggle-switch"

export const meta = {
  title: "Notification settings",
  description: "Toggle switches in an app's notification preferences, with a master switch that pauses the rest.",
}

const GROUPS = [
  {
    title: "Email",
    items: [
      { id: "mentions", label: "Mentions and replies", hint: "When someone @mentions you or replies to your comment.", on: true },
      { id: "digest", label: "Weekly digest", hint: "A Monday summary of what changed in your projects.", on: true },
      { id: "billing", label: "Billing receipts", hint: "Invoices and payment confirmations.", on: false },
    ],
  },
  {
    title: "Mobile push",
    items: [
      { id: "assigned", label: "Tasks assigned to you", hint: "Straight away, even outside working hours.", on: true },
      { id: "deadlines", label: "Deadline reminders", hint: "The morning a task is due.", on: false },
    ],
  },
]

export default function NotificationSettings() {
  const [paused, setPaused] = React.useState(false)
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROUPS.flatMap((group) => group.items.map((item) => [item.id, item.on])))
  )

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose what Northlight tells you about, and where.</p>

      <div className="mt-8 flex items-center justify-between gap-6 rounded-lg border bg-muted/40 p-4">
        <div>
          <p className="font-medium">Pause all notifications</p>
          <p className="text-sm text-muted-foreground">Useful on holiday. Nothing is lost; it waits in your inbox.</p>
        </div>
        <ToggleSwitch aria-label="Pause all notifications" checked={paused} onCheckedChange={setPaused} />
      </div>

      {GROUPS.map((group) => (
        <section key={group.title} aria-labelledby={`notify-${group.title}`} className="mt-8">
          <h2 id={`notify-${group.title}`} className="text-sm font-medium text-muted-foreground">
            {group.title}
          </h2>
          <ul className="mt-2 divide-y rounded-lg border">
            {group.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-6 p-4">
                <div>
                  <p id={`${item.id}-label`} className="text-sm font-medium">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.hint}</p>
                </div>
                <ToggleSwitch
                  aria-labelledby={`${item.id}-label`}
                  size="sm"
                  disabled={paused}
                  checked={!paused && state[item.id]}
                  onCheckedChange={(checked) => setState((s) => ({ ...s, [item.id]: checked }))}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
