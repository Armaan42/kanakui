"use client"

import * as React from "react"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PasscodePad } from "@/registry/default/ui/passcode-pad"

export const meta = {
  title: "Banking app lock screen",
  description: "The passcode pad on a phone app's lock screen: a wrong code shakes, the right one opens the account overview.",
}

// The bank and balances are made up. The demo passcode is 2468.
const PASSCODE = "2468"

export default function AppLock() {
  const [unlocked, setUnlocked] = React.useState(false)

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-[22rem] overflow-hidden rounded-[2.25rem] border-8 border-foreground/90 bg-background shadow-xl">
        {unlocked ? (
          <div className="min-h-[36rem] p-6">
            <p className="text-sm text-muted-foreground">Good morning, Ana</p>
            <p className="mt-6 text-sm text-muted-foreground">Current account</p>
            <p className="text-3xl font-semibold tabular-nums">€4,218.50</p>
            <ul className="mt-6 divide-y rounded-xl border text-sm">
              {[
                ["Copperleaf Market", "−€38.20", "Today"],
                ["Salary", "+€3,150.00", "Yesterday"],
                ["Tidewell Ferries", "−€24.00", "Tue"],
              ].map(([who, amount, when]) => (
                <li key={who} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span>
                    {who}
                    <span className="block text-xs text-muted-foreground">{when}</span>
                  </span>
                  <span className="tabular-nums">{amount}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-6 w-full" onClick={() => setUnlocked(false)}>
              <Lock aria-hidden="true" />
              Lock
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[36rem] flex-col items-center justify-center p-6">
            <p className="mb-2 font-semibold">Brightwater Bank</p>
            <PasscodePad
              title="Enter your passcode"
              successMessage="Welcome back"
              onSubmit={async (code) => {
                const ok = code === PASSCODE
                if (ok) setTimeout(() => setUnlocked(true), 600)
                return ok
              }}
            />
            <p className="mt-4 text-xs text-muted-foreground">Demo passcode: 2468</p>
          </div>
        )}
      </div>
    </div>
  )
}
