"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface PostageStampProps extends Omit<React.ComponentProps<"button">, "value"> {
  src: string
  alt: string
  title: string
  country: string
  /** Face value, for example "85c". */
  value: string
  /** Text around the postmark. */
  postmark?: { place: string; date: string }
  cancelled?: boolean
  defaultCancelled?: boolean
  onCancelledChange?: (cancelled: boolean) => void
}

const HOLE = 5

/**
 * A perforated postage stamp with a photo. Press it to bring the postmark
 * down; press again to lift it.
 */
function PostageStamp({
  src,
  alt,
  title,
  country,
  value,
  postmark = { place: "Air mail", date: "12 JUN 26" },
  cancelled: cancelledProp,
  defaultCancelled = false,
  onCancelledChange,
  className,
  style,
  onClick,
  ...props
}: PostageStampProps) {
  const [internal, setInternal] = React.useState(defaultCancelled)
  const cancelled = cancelledProp ?? internal
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const tile = HOLE * 3
  const mask = `linear-gradient(#000 0 0) center / calc(100% - ${tile}px) calc(100% - ${tile}px) no-repeat, radial-gradient(circle ${HOLE}px, transparent 96%, #000) ${-tile / 2}px ${-tile / 2}px / ${tile}px ${tile}px round`

  return (
    <button
      type="button"
      data-slot="postage-stamp"
      aria-pressed={cancelled}
      aria-label={`${title} stamp, ${country}, ${value}. ${cancelled ? "Postmarked" : "Press to postmark"}`}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        setInternal(!cancelled)
        onCancelledChange?.(!cancelled)
      }}
      style={style}
      className={cn("group relative block w-48 max-w-full rounded-sm outline-none drop-shadow-[0_6px_8px_rgb(0_0_0/0.28)] transition-transform hover:-rotate-1 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none", className)}
      {...props}
    >
      <span className="block bg-[#fbf7ee] p-3.5 text-neutral-800" style={{ mask, WebkitMask: mask }}>
        <span className="relative block overflow-hidden">
          <img src={src} alt={alt} draggable={false} className="aspect-[4/5] w-full bg-neutral-300 object-cover saturate-[0.85]" />
          <span className="absolute inset-x-0 top-0 flex items-start justify-between bg-linear-to-b from-black/55 to-transparent p-1.5 pb-6 text-white">
            <span className="text-[9px] font-semibold tracking-[0.16em] uppercase">{country}</span>
            <span className="font-serif text-lg leading-none font-semibold">{value}</span>
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-1.5 pt-6 text-left font-serif text-xs text-white italic">{title}</span>
        </span>
      </span>
      {cancelled ? (
        <svg aria-hidden="true" viewBox="0 0 170 110" className="animate-postage-stamp-thud pointer-events-none absolute top-[22%] -left-[14%] w-[118%] text-neutral-900/75 mix-blend-multiply motion-reduce:animate-none">
          <defs>
            <path id={`${id}-arc`} d="M16 55a34 34 0 1 1 68 0" />
            <path id={`${id}-low`} d="M20 57a30 30 0 0 0 60 0" />
          </defs>
          <g fill="none" stroke="currentColor">
            <circle cx="50" cy="55" r="43" strokeWidth="2" />
            <circle cx="50" cy="55" r="27" strokeWidth="1.2" />
            {[33, 44, 55, 66, 77].map((y) => (
              <path key={y} d={`M97 ${y}q9-6 18 0t18 0 18 0 17 0`} strokeWidth="2" />
            ))}
          </g>
          <g fill="currentColor" fontFamily="ui-monospace, monospace" fontWeight="700">
            <text fontSize="9.5" letterSpacing="1.2">
              <textPath href={`#${id}-arc`} startOffset="50%" textAnchor="middle">
                {postmark.place.toUpperCase()}
              </textPath>
            </text>
            <text x="50" y="58" fontSize="8.5" textAnchor="middle">
              {postmark.date}
            </text>
          </g>
        </svg>
      ) : null}
    </button>
  )
}

export { PostageStamp }
