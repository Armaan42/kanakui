"use client"

import * as React from "react"
import { ShieldCheck, Smartphone } from "lucide-react"

import { SafeDial } from "@/registry/default/ui/safe-dial"

// For the demo only. In a real app the code comes from your authenticator flow and is checked on the server.
const CODE: [number, number, number] = [24, 8, 63]

/** A playful second-step sign-in: dial the three-part code from your phone into the safe. */
export function VaultUnlock01() {
  const [open, setOpen] = React.useState(false)

  return (
    <section aria-labelledby="vault-unlock-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 id="vault-unlock-01-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            One more step to your vault
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Open your authenticator and dial the three numbers it shows. Press the centre after each one.
          </p>
          <div className="mt-8 flex max-w-sm items-center gap-4 rounded-2xl border bg-card p-5 text-card-foreground">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted">
              <Smartphone aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Authenticator · demo code</p>
              <p className="font-mono text-2xl font-semibold tracking-widest tabular-nums">
                {CODE.map((n) => String(n).padStart(2, "0")).join(" · ")}
              </p>
            </div>
          </div>
          {open ? (
            <p className="mt-6 flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck aria-hidden="true" className="size-5" />
              You’re in. Redirecting to your vault…
            </p>
          ) : null}
        </div>
        <SafeDial code={CODE} onUnlock={() => setOpen(true)} className="mx-auto" />
      </div>
    </section>
  )
}
