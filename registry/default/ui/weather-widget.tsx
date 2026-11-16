import * as React from "react"
import { Cloud, CloudRain, CloudSnow, Moon, Sun, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type WeatherCondition = "sunny" | "cloudy" | "rain" | "snow" | "night"

interface ForecastDay {
  day: string
  condition: WeatherCondition
  high: number
  low: number
}

interface WeatherWidgetProps extends React.ComponentProps<"section"> {
  city: string
  condition: WeatherCondition
  temperature: number
  high: number
  low: number
  /** Short description, e.g. "Light rain". Defaults to a description of the condition. */
  summary?: string
  forecast?: ForecastDay[]
}

const SKY: Record<WeatherCondition, string> = {
  sunny: "from-sky-500 via-sky-400 to-sky-300",
  cloudy: "from-slate-500 via-slate-400 to-slate-300",
  rain: "from-slate-700 via-slate-600 to-slate-500",
  snow: "from-slate-400 via-slate-300 to-blue-200",
  night: "from-indigo-950 via-indigo-900 to-violet-900",
}

const LABEL: Record<WeatherCondition, string> = {
  sunny: "Sunny",
  cloudy: "Cloudy",
  rain: "Rain",
  snow: "Snow",
  night: "Clear night",
}

const ICON: Record<WeatherCondition, LucideIcon> = { sunny: Sun, cloudy: Cloud, rain: CloudRain, snow: CloudSnow, night: Moon }

/** Stable pseudo-random numbers, so server and client render the same scene. */
const spread = (i: number, salt: number) => ((i * 9301 + salt * 49297) % 233280) / 233280

function CloudShape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn("absolute block aspect-[2.4] animate-weather-drift motion-reduce:animate-none", className)} style={style}>
      <span className="absolute bottom-0 left-0 h-[55%] w-full rounded-full bg-white/85" />
      <span className="absolute bottom-[25%] left-[15%] aspect-square w-[42%] rounded-full bg-white/85" />
      <span className="absolute bottom-[20%] left-[42%] aspect-square w-[50%] rounded-full bg-white/90" />
    </span>
  )
}

function Scene({ condition }: { condition: WeatherCondition }) {
  const cloudy = condition === "cloudy" || condition === "rain" || condition === "snow"
  const dim = condition === "rain" ? "opacity-70" : ""
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {condition === "sunny" ? (
        <span className="absolute -top-10 -right-10 size-40">
          <span className="absolute inset-0 animate-spin rounded-full bg-[repeating-conic-gradient(rgb(255_255_255/0.28)_0deg_8deg,transparent_8deg_24deg)] [mask-image:radial-gradient(circle,black_20%,transparent_70%)] motion-reduce:animate-none" style={{ animationDuration: "40s" }} />
          <span className="absolute inset-[30%] rounded-full bg-amber-200 shadow-[0_0_40px_12px_rgb(253_230_138/0.8)]" />
        </span>
      ) : null}
      {condition === "night" ? (
        <>
          <span className="absolute top-6 right-8 size-12 rounded-full shadow-[inset_-10px_-4px_0_0_rgb(254_243_199)]" />
          {Array.from({ length: 22 }, (_, i) => (
            <span
              key={i}
              className="absolute size-0.5 animate-pulse rounded-full bg-white motion-reduce:animate-none"
              style={{ left: `${spread(i, 1) * 100}%`, top: `${spread(i, 2) * 55}%`, animationDelay: `${spread(i, 3) * 2}s`, opacity: 0.4 + spread(i, 4) * 0.6 }}
            />
          ))}
        </>
      ) : null}
      {cloudy ? (
        <>
          <CloudShape className={cn("top-[6%] w-[40%]", dim)} style={{ animationDuration: "38s", animationDelay: "-12s" }} />
          <CloudShape className={cn("top-[18%] w-[30%] opacity-80", dim)} style={{ animationDuration: "52s", animationDelay: "-30s" }} />
          <CloudShape className={cn("top-[2%] w-[24%] opacity-70", dim)} style={{ animationDuration: "64s", animationDelay: "-5s" }} />
        </>
      ) : null}
      {condition === "rain"
        ? Array.from({ length: 42 }, (_, i) => (
            <span
              key={i}
              className="absolute top-0 h-5 w-[1.5px] animate-weather-fall rounded-full bg-linear-to-b from-transparent to-white/90 motion-reduce:hidden"
              style={{ left: `${spread(i, 5) * 100}%`, animationDuration: `${0.55 + spread(i, 6) * 0.35}s`, animationDelay: `${-spread(i, 7)}s` }}
            />
          ))
        : null}
      {condition === "snow"
        ? Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              className="absolute top-0 animate-weather-fall rounded-full bg-white motion-reduce:hidden"
              style={{
                left: `${spread(i, 8) * 100}%`,
                width: 2 + spread(i, 9) * 3,
                height: 2 + spread(i, 9) * 3,
                animationDuration: `${3 + spread(i, 10) * 3}s`,
                animationDelay: `${-spread(i, 11) * 6}s`,
              }}
            />
          ))
        : null}
    </div>
  )
}

/**
 * A weather widget with a live sky: the sun's rays turn, clouds drift,
 * rain or snow falls, stars twinkle at night. With reduced motion the scene
 * is still. It's a labelled section; the scene itself is decorative.
 */
function WeatherWidget({ city, condition, temperature, high, low, summary, forecast = [], className, ...props }: WeatherWidgetProps) {
  const label = summary ?? LABEL[condition]
  return (
    <section
      aria-label={`Weather in ${city}`}
      data-slot="weather-widget"
      className={cn("relative isolate w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-linear-to-b text-white shadow-xl", SKY[condition], className)}
      {...props}
    >
      <Scene condition={condition} />
      <div className="relative flex flex-col p-5 [text-shadow:0_1px_3px_rgb(0_0_0/0.35)]">
        <p className="text-sm font-medium">{city}</p>
        <p className="mt-1 text-6xl font-light tracking-tight tabular-nums">{temperature}°</p>
        <p className="mt-1 text-sm font-medium">{label}</p>
        <p className="text-sm text-white/85">
          H:{high}° L:{low}°
        </p>

        {forecast.length > 0 ? (
          <ul className="mt-5 grid grid-cols-5 gap-1 rounded-2xl bg-white/15 p-2.5 text-center text-xs backdrop-blur-md">
            {forecast.slice(0, 5).map((f) => {
              const Icon = ICON[f.condition]
              return (
                <li key={f.day} className="flex flex-col items-center gap-1.5">
                  <span className="font-medium">{f.day}</span>
                  <Icon aria-label={LABEL[f.condition]} className="size-4" />
                  <span className="tabular-nums">
                    {f.high}° <span className="text-white/70">{f.low}°</span>
                  </span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export { WeatherWidget }
