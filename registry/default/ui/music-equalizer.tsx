"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface EqualizerPreset {
  name: string
  gains: number[]
}

interface MusicEqualizerProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  /** Band labels, low to high. */
  bands?: string[]
  /** Controlled gains in decibels, one per band. */
  value?: number[]
  defaultValue?: number[]
  presets?: EqualizerPreset[]
  /** Largest boost or cut in decibels. */
  range?: number
  onValueChange?: (gains: number[]) => void
}

const BANDS = ["60", "170", "310", "600", "1k", "3k", "6k", "12k"]
const PRESETS: EqualizerPreset[] = [
  { name: "Flat", gains: [0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Bass", gains: [9, 7, 4, 1, 0, 0, 0, 0] },
  { name: "Vocal", gains: [-3, -2, 0, 3, 6, 5, 2, 0] },
  { name: "Rock", gains: [6, 4, -2, -3, 0, 3, 5, 6] },
  { name: "Air", gains: [-2, -1, 0, 0, 1, 3, 6, 9] },
]
const SEGMENTS = 25
const signed = (gain: number) => `${gain > 0 ? "+" : ""}${gain} dB`

/**
 * The front panel of a graphic equalizer: faders, LED columns, a response
 * curve and presets. It holds the settings and reports them; connect
 * `onValueChange` to your audio engine to shape real sound.
 */
function MusicEqualizer({ bands = BANDS, value, defaultValue, presets = PRESETS, range = 12, onValueChange, className, ...props }: MusicEqualizerProps) {
  const [internal, setInternal] = React.useState(() => defaultValue ?? bands.map(() => 0))
  const gains = value ?? internal
  const name = React.useId()
  const activePreset = presets.find((preset) => preset.gains.length === gains.length && preset.gains.every((gain, i) => gain === gains[i]))?.name

  const set = (next: number[]) => {
    setInternal(next)
    onValueChange?.(next)
  }

  const curve = gains.map((gain, i) => `${((i + 0.5) / gains.length) * 100},${50 - (gain / range) * 44}`).join(" ")

  return (
    <div data-slot="music-equalizer" className={cn("w-full max-w-lg rounded-xl bg-linear-to-b from-neutral-800 to-neutral-950 p-4 text-neutral-300 shadow-[0_20px_36px_-18px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.12)] sm:p-5", className)} {...props}>
      <div className="relative h-16 overflow-hidden rounded-md bg-black ring-1 ring-white/10">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
          <line x1="0" x2="100" y1="50" y2="50" stroke="rgb(255 255 255 / 0.16)" vectorEffect="non-scaling-stroke" />
          <polyline points={curve} fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="mt-4 flex justify-between gap-0.5">
        {bands.map((band, i) => {
          const gain = gains[i] ?? 0
          const lit = Math.round(((gain + range) / (range * 2)) * (SEGMENTS - 1))
          const middle = (SEGMENTS - 1) / 2
          return (
            <div key={band} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div className="flex h-40 items-stretch gap-1">
                <span aria-hidden="true" className="flex flex-col-reverse justify-between py-1">
                  {Array.from({ length: SEGMENTS }, (_, segment) => {
                    const on = (segment >= Math.min(lit, middle) && segment <= Math.max(lit, middle))
                    return <span key={segment} className={cn("h-0.5 w-1 rounded-full sm:w-1.5", on ? (segment > 19 ? "bg-red-500" : "bg-amber-400") : "bg-white/10")} />
                  })}
                </span>
                <input
                  type="range"
                  min={-range}
                  max={range}
                  step={1}
                  value={gain}
                  aria-label={`${band} hertz`}
                  aria-valuetext={signed(gain)}
                  onChange={(event) => set(bands.map((_, band) => (band === i ? Number(event.target.value) : (gains[band] ?? 0))))}
                  className="h-full w-4 cursor-grab appearance-none bg-transparent outline-none [direction:rtl] [writing-mode:vertical-lr] active:cursor-grabbing focus-visible:[&::-webkit-slider-thumb]:ring-3 focus-visible:[&::-webkit-slider-thumb]:ring-amber-400/60 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-neutral-200 [&::-moz-range-track]:w-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-black [&::-webkit-slider-runnable-track]:w-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black [&::-webkit-slider-thumb]:-ml-1.5 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:bg-linear-to-b [&::-webkit-slider-thumb]:from-white [&::-webkit-slider-thumb]:to-neutral-400 [&::-webkit-slider-thumb]:shadow-md"
                />
              </div>
              <span aria-hidden="true" className="font-mono text-[9px] text-neutral-400 sm:text-[10px]">
                {band}
              </span>
            </div>
          )
        })}
      </div>

      <fieldset className="mt-4 border-t border-white/10 pt-3">
        <legend className="sr-only">Preset</legend>
        <div className="flex flex-wrap justify-center gap-1.5">
          {presets.map((preset) => (
            <label key={preset.name} className="cursor-pointer">
              <input type="radio" name={name} className="peer sr-only" checked={activePreset === preset.name} onChange={() => set(preset.gains)} />
              <span className="block rounded-[4px] bg-neutral-700/70 px-2.5 py-1 text-[11px] font-medium text-neutral-300 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] transition-colors peer-checked:bg-amber-400 peer-checked:text-neutral-950 peer-focus-visible:ring-3 peer-focus-visible:ring-amber-400/50">
                {preset.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export { MusicEqualizer }
