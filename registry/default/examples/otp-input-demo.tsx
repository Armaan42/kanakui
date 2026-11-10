"use client"

import * as React from "react"

import { OtpInput } from "@/registry/default/ui/otp-input"

export default function OtpInputDemo() {
  const [code, setCode] = React.useState("")
  return (
    <div className="flex flex-col items-center gap-3">
      <OtpInput value={code} onValueChange={setCode} />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {code.length === 6 ? `Code entered: ${code}` : "Enter the 6-digit code we sent you."}
      </p>
    </div>
  )
}
