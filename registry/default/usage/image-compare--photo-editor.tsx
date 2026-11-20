"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImageCompare } from "@/registry/default/ui/image-compare"

export const meta = {
  title: "Photo editor",
  description: "Image compare as the before/after view of a photo editor: move the sliders and the edited side updates live.",
}

// Sample photo. Swap in your own.
const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=788&fit=crop&auto=format&q=80"
const ALT = "Snowy mountain peaks rising above a sea of clouds at sunset"
const DEFAULTS = { exposure: 105, contrast: 112, saturation: 125, warmth: 8 }

export default function PhotoEditor() {
  const [edit, setEdit] = React.useState(DEFAULTS)
  const filter = `brightness(${edit.exposure}%) contrast(${edit.contrast}%) saturate(${edit.saturation}%) sepia(${edit.warmth}%)`

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h1 className="font-medium">sunrise-above-clouds.jpg</h1>
          <span className="text-sm text-muted-foreground">Drag the divider to compare</span>
        </div>
        <ImageCompare
          beforeLabel="Original"
          afterLabel="Edited"
          before={<img src={PHOTO} alt={ALT} width={1400} height={788} className="size-full object-cover" />}
          after={<img src={PHOTO} alt={`${ALT}, edited`} width={1400} height={788} className="size-full object-cover" style={{ filter }} />}
        />
      </div>

      <aside aria-labelledby="adjust-title" className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 id="adjust-title" className="font-medium">
            Adjust
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setEdit(DEFAULTS)}>
            <RotateCcw aria-hidden="true" />
            Reset
          </Button>
        </div>
        <div className="mt-4 space-y-5">
          {(
            [
              ["exposure", "Exposure", 60, 140],
              ["contrast", "Contrast", 60, 160],
              ["saturation", "Saturation", 0, 200],
              ["warmth", "Warmth", 0, 60],
            ] as const
          ).map(([key, label, min, max]) => (
            <label key={key} className="block text-sm">
              <span className="flex justify-between">
                {label}
                <span className="text-muted-foreground tabular-nums">{edit[key]}</span>
              </span>
              <input
                type="range"
                min={min}
                max={max}
                value={edit[key]}
                onChange={(event) => setEdit((e) => ({ ...e, [key]: Number(event.target.value) }))}
                className="mt-2 w-full accent-foreground"
              />
            </label>
          ))}
        </div>
        <Button className="mt-6 w-full">Export</Button>
      </aside>
    </div>
  )
}
