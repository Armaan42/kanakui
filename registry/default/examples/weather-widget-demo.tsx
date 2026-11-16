"use client"

import * as React from "react"

import { WeatherWidget, type WeatherCondition } from "@/registry/default/ui/weather-widget"
import { cn } from "@/lib/utils"

const SCENES: { condition: WeatherCondition; label: string; temperature: number; high: number; low: number; summary: string }[] = [
  { condition: "sunny", label: "Sunny", temperature: 24, high: 27, low: 17, summary: "Sunny and warm" },
  { condition: "cloudy", label: "Cloudy", temperature: 19, high: 21, low: 15, summary: "Mostly cloudy" },
  { condition: "rain", label: "Rain", temperature: 14, high: 16, low: 11, summary: "Light rain all afternoon" },
  { condition: "snow", label: "Snow", temperature: -2, high: 0, low: -5, summary: "Snow showers" },
  { condition: "night", label: "Night", temperature: 12, high: 22, low: 11, summary: "Clear night" },
]

export default function WeatherWidgetDemo() {
  const [index, setIndex] = React.useState(2)
  const scene = SCENES[index]

  return (
    <div className="flex w-[min(22rem,calc(100vw-3rem))] flex-col items-center gap-5">
      <WeatherWidget
        city="Lisbon"
        condition={scene.condition}
        temperature={scene.temperature}
        high={scene.high}
        low={scene.low}
        summary={scene.summary}
        forecast={[
          { day: "Tue", condition: "rain", high: 16, low: 11 },
          { day: "Wed", condition: "cloudy", high: 19, low: 13 },
          { day: "Thu", condition: "sunny", high: 23, low: 15 },
          { day: "Fri", condition: "sunny", high: 25, low: 16 },
          { day: "Sat", condition: "cloudy", high: 21, low: 14 },
        ]}
      />
      <div role="group" aria-label="Weather" className="flex flex-wrap justify-center gap-0.5 rounded-lg border p-0.5 text-xs">
        {SCENES.map((s, i) => (
          <button
            key={s.condition}
            type="button"
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            className={cn("rounded-md px-2.5 py-1", index === i ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground")}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
