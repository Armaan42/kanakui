"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/registry/default/ui/password-input"

interface Login01Props {
  /**
   * Signs the user in, e.g. by calling your auth provider. Throw an Error with
   * a user-facing message to show it. Without it, the form says it isn't connected.
   */
  onSubmit?: (credentials: { email: string; password: string }) => Promise<void> | void
}

/**
 * A centered sign-in card with email, password (show/hide), a forgot-password
 * link and a sign-up prompt. Uses native validation and announces errors.
 */
export function Login01({ onSubmit }: Login01Props) {
  const [status, setStatus] = React.useState<{ busy: boolean; message?: string }>({ busy: false })
  const emailId = React.useId()
  const passwordId = React.useId()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!onSubmit) {
      setStatus({ busy: false, message: "This form isn’t connected yet. Pass an onSubmit handler to sign people in." })
      return
    }
    setStatus({ busy: true })
    try {
      await onSubmit({ email: String(data.get("email") ?? ""), password: String(data.get("password") ?? "") })
      setStatus({ busy: false })
    } catch (error) {
      setStatus({ busy: false, message: error instanceof Error ? error.message : "Sign-in failed. Please try again." })
    }
  }

  return (
    <section className="flex min-h-[36rem] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <span aria-hidden="true" className="mx-auto block size-8 rounded-lg bg-foreground" />
        <h1 className="mt-5 text-center text-xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor={emailId} className="text-sm font-medium">
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-10 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={passwordId} className="text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                Forgot password?
              </a>
            </div>
            <PasswordInput id={passwordId} name="password" autoComplete="current-password" required />
          </div>
          <Button type="submit" className="w-full" disabled={status.busy}>
            {status.busy ? "Signing in…" : "Sign in"}
          </Button>
          <p role="status" className="min-h-5 text-sm text-muted-foreground">
            {status.message ?? ""}
          </p>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  )
}
