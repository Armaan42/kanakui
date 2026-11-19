"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface LightSwitch {
  id: string
  label: string
  defaultOn?: boolean
}

interface LightSwitchPanelProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  switches: LightSwitch[]
  /** Controlled list of the ids that are on. */
  value?: string[]
  onValueChange?: (on: string[]) => void
}

const Screw = ({ className }: { className: string }) => (
  <span aria-hidden="true" className={cn("absolute size-2.5 rounded-full bg-linear-135 from-neutral-200 to-neutral-500 shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.3)]", className)}>
    <span className="absolute inset-x-0.5 top-1/2 h-px -translate-y-1/2 rotate-45 bg-neutral-700" />
  </span>
)

/**
 * A wall plate of rocker switches with a row of pendant lights above it. Each
 * rocker tips with a click and lights its bulb; use it as a playful settings
 * control or wire it to real devices.
 */
function LightSwitchPanel({ switches, value, onValueChange, className, ...props }: LightSwitchPanelProps) {
  const [internal, setInternal] = React.useState(() => switches.filter((item) => item.defaultOn).map((item) => item.id))
  const on = value ?? internal

  const set = (next: string[]) => {
    setInternal(next)
    onValueChange?.(next)
  }

  return (
    <div data-slot="light-switch-panel" className={cn("w-full max-w-md", className)} {...props}>
      <div aria-hidden="true" className="relative flex h-32 justify-around overflow-hidden rounded-t-xl bg-neutral-900">
        {switches.map((item) => {
          const lit = on.includes(item.id)
          return (
            <span key={item.id} className="relative flex flex-col items-center">
              <span className="h-12 w-px bg-neutral-600" />
              <span className="h-3 w-5 rounded-t-full bg-neutral-500" />
              <span className={cn("size-7 rounded-full transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none", lit ? "bg-amber-100 shadow-[0_0_18px_6px_rgb(253_224_71/0.65),0_0_60px_28px_rgb(251_191_36/0.28)]" : "bg-neutral-700")} />
            </span>
          )
        })}
      </div>
      <div className="relative rounded-b-xl bg-linear-to-b from-neutral-100 to-neutral-200 px-8 py-7 text-neutral-800 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.5),inset_0_1px_0_white] ring-1 ring-black/10">
        <Screw className="top-2 left-1/2 -translate-x-1/2" />
        <Screw className="bottom-2 left-1/2 -translate-x-1/2" />
        <div className="flex justify-around gap-3">
          {switches.map((item) => {
            const lit = on.includes(item.id)
            return (
              <div key={item.id} className="flex min-w-0 flex-col items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={lit}
                  aria-label={item.label}
                  onClick={() => set(lit ? on.filter((id) => id !== item.id) : [...on, item.id])}
                  className="rounded-md bg-neutral-300 p-1 outline-none [perspective:220px] focus-visible:ring-3 focus-visible:ring-blue-600/50"
                >
                  <span
                    className={cn(
                      "relative block h-20 w-11 rounded-[5px] bg-linear-to-b from-white to-neutral-100 transition-transform duration-100 motion-reduce:transition-none",
                      lit ? "shadow-[inset_0_-10px_10px_-8px_rgb(0_0_0/0.22),0_3px_2px_rgb(0_0_0/0.3)] [transform:rotateX(-13deg)]" : "shadow-[inset_0_10px_10px_-8px_rgb(0_0_0/0.22),0_-3px_2px_rgb(0_0_0/0.18)] [transform:rotateX(13deg)]"
                    )}
                  >
                    <span aria-hidden="true" className={cn("absolute top-2.5 left-1/2 h-1.5 w-1 -translate-x-1/2 rounded-full transition-colors", lit ? "bg-amber-500" : "bg-neutral-300")} />
                  </span>
                </button>
                <span aria-hidden="true" className="max-w-16 truncate text-[11px] font-medium text-neutral-600">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {on.length} of {switches.length} lights on
      </p>
    </div>
  )
}

export { LightSwitchPanel }
