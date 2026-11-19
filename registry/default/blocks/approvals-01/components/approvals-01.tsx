"use client"

import * as React from "react"
import { Check, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { RubberStamp } from "@/registry/default/ui/rubber-stamp"

// The people, amounts and requests are made up.
const REQUESTS = [
  { id: "EXP-1042", who: "Maya Okafor", what: "Client dinner, Lisbon", amount: 186.4, date: "12 May", lines: [["Dinner for 4", 162.4], ["Taxi", 24]] },
  { id: "EXP-1043", who: "Tom Reyes", what: "Design conference ticket", amount: 420, date: "13 May", lines: [["Early-bird pass", 420]] },
  { id: "EXP-1044", who: "Ines Kovac", what: "Studio lights", amount: 312.9, date: "14 May", lines: [["2 × LED panels", 279.9], ["Shipping", 33]] },
] as const

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

/** An approvals inbox: pick a request and stamp it. Stamped requests are marked approved. */
export function Approvals01() {
  const [selected, setSelected] = React.useState<string>(REQUESTS[0].id)
  const [approved, setApproved] = React.useState<string[]>([])
  const request = REQUESTS.find((item) => item.id === selected) ?? REQUESTS[0]

  return (
    <section aria-labelledby="approvals-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="approvals-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Waiting for your stamp
          </h2>
          <p className="text-sm text-muted-foreground tabular-nums">
            {approved.length} of {REQUESTS.length} approved
          </p>
        </div>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <ul className="divide-y overflow-hidden rounded-xl border self-start">
            {REQUESTS.map((item) => {
              const done = approved.includes(item.id)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={selected === item.id}
                    onClick={() => setSelected(item.id)}
                    className="group flex w-full items-start gap-3 px-4 py-3 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset aria-pressed:bg-muted"
                  >
                    <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", done ? "bg-emerald-600 text-white" : "bg-muted-foreground/15 text-muted-foreground")}>
                      {done ? <Check aria-hidden="true" className="size-3" /> : <Clock aria-hidden="true" className="size-3" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{item.what}</span>
                      <span className="block text-xs text-muted-foreground group-aria-pressed:text-foreground/80">
                        {item.who} · {done ? "Approved" : "Pending"}
                      </span>
                    </span>
                    <span className="font-mono text-sm tabular-nums">{money.format(item.amount)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <RubberStamp key={request.id} onStamp={() => setApproved((list) => (list.includes(request.id) ? list : [...list, request.id]))} className="max-w-none">
            <p className="font-mono text-[11px] text-neutral-500">{request.id}</p>
            <p className="mt-1 font-serif text-xl font-semibold">{request.what}</p>
            <p className="mt-1 text-xs text-neutral-500">
              Submitted by {request.who} on {request.date}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              {request.lines.map(([label, value]) => (
                <p key={label} className="flex justify-between">
                  <span>{label}</span>
                  <span className="tabular-nums">{money.format(value)}</span>
                </p>
              ))}
              <p className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{money.format(request.amount)}</span>
              </p>
            </div>
          </RubberStamp>
        </div>
      </div>
    </section>
  )
}
