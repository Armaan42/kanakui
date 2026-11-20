"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stepper } from "@/registry/default/ui/stepper"

export const meta = {
  title: "Workspace onboarding",
  description: "A stepper above a three-step onboarding flow, with Back and Continue moving between the steps.",
}

const STEPS = [
  { title: "Account", description: "Your details" },
  { title: "Workspace", description: "Name your team" },
  { title: "Invite", description: "Add teammates" },
]

export default function Onboarding() {
  const [step, setStep] = React.useState(0)
  const last = step === STEPS.length - 1

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Set up Northlight</h1>
      <p className="mt-1 text-sm text-muted-foreground">Takes about two minutes. You can change all of this later.</p>
      <Stepper steps={STEPS} current={step} className="mt-8" />

      <form
        className="mt-8 rounded-xl border bg-card p-6"
        onSubmit={(event) => {
          event.preventDefault()
          if (!last) setStep(step + 1)
        }}
      >
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              First name
              <Input defaultValue="Lena" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Last name
              <Input defaultValue="Okafor" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Role
              <Input defaultValue="Head of operations" />
            </label>
          </div>
        ) : step === 1 ? (
          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium">
              Workspace name
              <Input defaultValue="Oakline Ops" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Workspace address
              <span className="flex items-center rounded-md border pl-3 text-sm text-muted-foreground focus-within:ring-3 focus-within:ring-ring/50">
                northlight.app/
                <input defaultValue="oakline-ops" className="h-9 min-w-0 flex-1 bg-transparent pr-3 text-foreground outline-none" aria-label="Workspace address" />
              </span>
            </label>
          </div>
        ) : (
          <div className="grid gap-3">
            <p className="text-sm text-muted-foreground">Invite up to five people now. They get an email with a link.</p>
            {["tomas@oakline.example", "mei@oakline.example", ""].map((email, i) => (
              <Input key={i} type="email" aria-label={`Teammate ${i + 1} email`} placeholder="name@company.com" defaultValue={email} />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between gap-3">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Back
          </Button>
          <Button type="submit">{last ? "Send invites and finish" : "Continue"}</Button>
        </div>
      </form>
    </div>
  )
}
