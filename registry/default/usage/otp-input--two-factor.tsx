"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { OtpInput } from "@/registry/default/ui/otp-input"

export const meta = {
  title: "Two-factor sign-in",
  description: "The OTP input on a two-factor step: it verifies as soon as six digits are in, with a resend countdown below.",
}

export default function TwoFactor() {
  const [code, setCode] = React.useState("")
  const [state, setState] = React.useState<"idle" | "checking" | "done">("idle")
  const [wait, setWait] = React.useState(30)

  React.useEffect(() => {
    if (wait === 0) return
    const timer = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(timer)
  }, [wait])

  const verify = () => {
    setState("checking")
    setTimeout(() => setState("done"), 900)
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col justify-center px-6 py-12">
      <span className="grid size-11 place-items-center rounded-full bg-muted">
        <ShieldCheck aria-hidden="true" className="size-5" />
      </span>
      {state === "done" ? (
        <div role="status">
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">You&apos;re signed in</h1>
          <p className="mt-2 text-sm text-muted-foreground">This device is trusted for 30 days.</p>
          <Button className="mt-6 w-full" onClick={() => { setState("idle"); setCode("") }}>
            Continue to Northlight
          </Button>
        </div>
      ) : (
        <>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Check your phone</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code we texted to the number ending in 4471. Any six digits work here.</p>
          <OtpInput
            className="mt-6"
            length={6}
            label="Verification code"
            value={code}
            onValueChange={setCode}
            onComplete={verify}
            disabled={state === "checking"}
          />
          <Button className="mt-6 w-full" disabled={code.length < 6 || state === "checking"} onClick={verify}>
            {state === "checking" ? "Checking…" : "Verify"}
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {wait > 0 ? (
              <>Resend code in {wait}s</>
            ) : (
              <button type="button" onClick={() => setWait(30)} className="font-medium text-foreground underline underline-offset-4">
                Resend code
              </button>
            )}
          </p>
        </>
      )}
    </div>
  )
}
