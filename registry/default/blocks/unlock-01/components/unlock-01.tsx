"use client"

import { Laptop, MapPin, ShieldCheck } from "lucide-react"

import { PasscodePad } from "@/registry/default/ui/passcode-pad"

// The device and place are made up. The demo passcode is 2580.
const details = [
  { icon: Laptop, label: "Device", value: "MacBook Pro · Safari" },
  { icon: MapPin, label: "Location", value: "Lisbon, Portugal" },
  { icon: ShieldCheck, label: "Requested", value: "Just now" },
]

/** A step-up verification screen: the passcode pad beside the sign-in it's protecting. */
export function Unlock01() {
  return (
    <section aria-labelledby="unlock-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-4xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Security check</p>
          <h2 id="unlock-01-title" className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Is this you signing in?
          </h2>
          <p className="mt-3 text-muted-foreground">Enter your 4-digit app passcode to approve this sign-in. If it wasn’t you, ignore it and nothing happens.</p>
          <dl className="mt-8 divide-y rounded-2xl border bg-card">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3 text-sm">
                <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="ml-auto font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">Demo passcode: 2580</p>
        </div>
        <div className="flex justify-center rounded-[2rem] border bg-card px-6 py-10 shadow-sm">
          <PasscodePad
            title="Enter your passcode"
            successMessage="Sign-in approved"
            onSubmit={(code) => new Promise((resolve) => setTimeout(() => resolve(code === "2580"), 250))}
          />
        </div>
      </div>
    </section>
  )
}
