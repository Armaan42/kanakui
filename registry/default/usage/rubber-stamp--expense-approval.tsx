"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { RubberStamp } from "@/registry/default/ui/rubber-stamp"

export const meta = {
  title: "Expense approval",
  description: "The rubber stamp on an expense claim in an approvals queue: stamping it marks the claim as approved.",
}

// The company, people and amounts are made up.
const QUEUE = [
  { id: "EXP-311", who: "Tomás Rivera", what: "Client dinner, Porto", amount: "€184.50" },
  { id: "EXP-312", who: "Mei Lin", what: "Train to Coimbra", amount: "€42.00" },
]

export default function ExpenseApproval() {
  const [approved, setApproved] = React.useState(false)

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside aria-labelledby="queue">
        <h1 id="queue" className="text-lg font-semibold">
          Approvals
        </h1>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="rounded-lg border bg-card p-3">
            <p className="font-medium">EXP-310 · Jonas Keller</p>
            <p className="text-muted-foreground">{approved ? "Approved" : "Waiting for you"}</p>
          </li>
          {QUEUE.map((item) => (
            <li key={item.id} className="rounded-lg border p-3 text-muted-foreground">
              <p className="font-medium text-foreground">
                {item.id} · {item.who}
              </p>
              <p>
                {item.what} · {item.amount}
              </p>
            </li>
          ))}
        </ul>
      </aside>
      <div>
        <RubberStamp text="Approved" onStamp={() => setApproved(true)}>
          <p className="font-serif text-lg font-semibold">Expense claim EXP-310</p>
          <p className="mt-1 text-xs text-neutral-500">Jonas Keller · Oakline · submitted 18 Nov 2026</p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Flights Lisbon–Berlin</span>
              <span>€212.00</span>
            </p>
            <p className="flex justify-between">
              <span>Hotel, 2 nights</span>
              <span>€236.00</span>
            </p>
            <p className="flex justify-between">
              <span>Taxis</span>
              <span>€38.40</span>
            </p>
            <p className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>€486.40</span>
            </p>
          </div>
        </RubberStamp>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" disabled={approved}>
            Ask a question
          </Button>
          <Button variant="ghost" disabled={approved}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  )
}
