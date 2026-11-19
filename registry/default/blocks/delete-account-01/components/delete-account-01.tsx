"use client"

import * as React from "react"
import { AlertTriangle } from "lucide-react"

import { PaperShredder } from "@/registry/default/ui/paper-shredder"

const GOING = ["Your profile and email address", "18 saved projects and their history", "Billing details and invoices", "Team memberships and invitations"]

/**
 * Account deletion with a shredder: the page lists what will go, and shredding
 * it is the confirmation. Run your real deletion where `onShred` fires.
 */
export function DeleteAccount01() {
  const [confirm, setConfirm] = React.useState("")
  const [deleted, setDeleted] = React.useState(false)
  const ready = confirm.trim().toLowerCase() === "delete my account"

  return (
    <section aria-labelledby="delete-account-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-lg">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive">
            <AlertTriangle aria-hidden="true" className="size-4" />
            Danger zone
          </p>
          <h2 id="delete-account-01-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Delete your account
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">This can’t be undone. Everything on the page goes in the shredder:</p>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm">
            {GOING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <label className="mt-8 block text-sm font-medium" htmlFor="delete-account-01-confirm">
            Type <span className="font-mono">delete my account</span> to unlock the shredder
          </label>
          <input
            id="delete-account-01-confirm"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            disabled={deleted}
            autoComplete="off"
            className="mt-2 h-10 w-full max-w-sm rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
          />
          <p role="status" className="mt-4 min-h-6 text-sm font-medium">
            {deleted ? "Your account is scheduled for deletion. We’ll email you a receipt." : ready ? "Unlocked. Press Shred." : ""}
          </p>
        </div>
        <div className={ready || deleted ? "" : "opacity-50 grayscale"} inert={!ready && !deleted}>
          <PaperShredder onShred={() => setDeleted(true)} className="mx-auto">
            <p className="font-semibold text-neutral-900">Account: priya@example.com</p>
            {GOING.map((item) => (
              <p key={item} className="mt-2">
                {item}
              </p>
            ))}
          </PaperShredder>
        </div>
      </div>
    </section>
  )
}
