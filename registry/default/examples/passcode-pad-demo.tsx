"use client"

import { PasscodePad } from "@/registry/default/ui/passcode-pad"

export default function PasscodePadDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <PasscodePad onSubmit={(code) => code === "2580"} />
      <p className="text-xs text-muted-foreground">Hint: the passcode is 2580</p>
    </div>
  )
}
