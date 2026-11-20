"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PasswordInput, scorePassword } from "@/registry/default/ui/password-input"

export const meta = {
  title: "Change password",
  description: "Password inputs on a security settings page: current password, a new one with the strength meter, and a confirmation that must match.",
}

export default function ChangePassword() {
  const [current, setCurrent] = React.useState("")
  const [next, setNext] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [saved, setSaved] = React.useState(false)
  const mismatch = confirm.length > 0 && confirm !== next
  const valid = current.length > 0 && scorePassword(next) >= 3 && confirm === next

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Security</h1>
      <p className="mt-1 text-sm text-muted-foreground">Signed-in devices stay signed in after you change your password.</p>
      <form
        className="mt-8 grid gap-5 rounded-xl border bg-card p-6"
        onSubmit={(event) => {
          event.preventDefault()
          if (valid) setSaved(true)
        }}
      >
        <h2 className="font-medium">Change password</h2>
        <div className="grid gap-1.5">
          <label htmlFor="pw-current" className="text-sm font-medium">
            Current password
          </label>
          <PasswordInput id="pw-current" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="pw-new" className="text-sm font-medium">
            New password
          </label>
          <PasswordInput id="pw-new" showStrength autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="pw-confirm" className="text-sm font-medium">
            Confirm new password
          </label>
          <PasswordInput
            id="pw-confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={mismatch}
            aria-describedby={mismatch ? "pw-mismatch" : undefined}
          />
          {mismatch ? (
            <p id="pw-mismatch" className="text-sm text-destructive">
              The passwords don&apos;t match.
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={!valid}>
            Update password
          </Button>
          {saved ? (
            <span role="status" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Check aria-hidden="true" className="size-4" />
              Password updated
            </span>
          ) : null}
        </div>
      </form>
    </div>
  )
}
