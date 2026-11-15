"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface PhotoFolderImage {
  src: string
  alt: string
}

interface PhotoFolderProps extends Omit<React.ComponentProps<"button">, "children"> {
  /** Photos inside the folder. The first three to five fan out; more are counted, not shown. */
  images: PhotoFolderImage[]
  /** Folder name, shown under it and used as its accessible name. */
  label: string
  /** Second line under the name. Defaults to the number of photos. */
  description?: string
  /** Folder color: any CSS color. Darker and lighter shades are mixed from it. */
  color?: string
  /** Controlled open state. Leave unset to open on hover and toggle on click. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const MAX_SHOWN = 5

/** Where each photo sits, closed and open: fanned out evenly around the center. */
function photoPlacement(index: number, count: number) {
  const spread = count === 1 ? 0 : count === 2 ? 10 : 14
  const t = count === 1 ? 0 : index / (count - 1) - 0.5 // -0.5 … 0.5
  return {
    "--rest-r": `${t * 8}deg`,
    "--rest-y": "10%",
    "--open-x": `${t * 95}%`,
    "--open-y": `${-74 + Math.abs(t) * 20}%`,
    "--open-r": `${t * spread * 2}deg`,
    transitionDelay: `${index * 35}ms`,
    zIndex: index + 1,
  } as React.CSSProperties
}

/**
 * A folder that opens to fan out the photos inside. It opens while hovered,
 * and a click, tap, Enter or Space keeps it open (or closes it again). It's
 * a button with `aria-expanded`, named after the folder.
 */
function PhotoFolder({
  images,
  label,
  description,
  color = "oklch(0.7 0.14 245)",
  open: openProp,
  onOpenChange,
  className,
  style,
  onClick,
  onPointerEnter,
  onPointerLeave,
  ...props
}: PhotoFolderProps) {
  const [hovered, setHovered] = React.useState(false)
  const [pinned, setPinned] = React.useState(false)
  const open = openProp ?? (hovered || pinned)
  const shown = images.slice(0, MAX_SHOWN)
  const descriptionId = React.useId()

  const setPinnedAndNotify = (next: boolean) => {
    setPinned(next)
    onOpenChange?.(next)
  }

  return (
    <button
      type="button"
      data-slot="photo-folder"
      data-open={open || undefined}
      aria-expanded={open}
      aria-describedby={descriptionId}
      aria-label={`${label}, ${description ?? `${images.length} ${images.length === 1 ? "photo" : "photos"}`}`}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.pointerType !== "touch") {
          setHovered(true)
          if (!pinned) onOpenChange?.(true)
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (event.pointerType !== "touch") {
          setHovered(false)
          if (!pinned) onOpenChange?.(false)
        }
      }}
      onClick={(event) => {
        onClick?.(event)
        // With a mouse the folder is already open from hovering, so a click
        // pins it (or unpins it); with touch or keys it toggles.
        setPinnedAndNotify(!pinned)
      }}
      className={cn(
        "group/folder relative inline-flex w-56 flex-col items-center gap-3 rounded-2xl p-2 text-center outline-none select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      style={
        {
          "--folder": color,
          "--folder-back": `color-mix(in oklch, ${color} 78%, black)`,
          "--folder-front-top": `color-mix(in oklch, ${color} 72%, white)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <span aria-hidden="true" className="relative block aspect-[5/4] w-full perspective-[800px]">
        {/* Back of the folder, with its tab. */}
        <span className="absolute top-0 left-0 h-[16%] w-[42%] rounded-t-[10%_30%] bg-(--folder-back) [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]" />
        <span className="absolute inset-x-0 top-[10%] bottom-0 rounded-[7%/9%] bg-(--folder-back)" />

        {/* Photos, tucked in and peeking over the front until it opens. */}
        <span className="absolute inset-x-[20%] top-[16%] bottom-[18%]">
          {shown.map((image, index) => (
            <span
              key={image.src}
              className={cn(
                "absolute inset-0 block overflow-hidden rounded-[6%] border-[3px] border-white bg-white shadow-md",
                "transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none",
                "[transform:translate(0,var(--rest-y))_rotate(var(--rest-r))]",
                "group-data-open/folder:[transform:translate(var(--open-x),var(--open-y))_rotate(var(--open-r))]"
              )}
              style={photoPlacement(index, shown.length)}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            </span>
          ))}
        </span>

        {/* Front flap: tips forward when the folder opens. */}
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 h-[72%] origin-bottom rounded-[7%/10%]",
            "bg-linear-to-b from-(--folder-front-top) to-(--folder) shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_-1px_6px_rgb(0_0_0/0.12)]",
            "transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none",
            "group-data-open/folder:[transform:rotateX(-24deg)]"
          )}
        />
      </span>

      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          {description ?? `${images.length} ${images.length === 1 ? "photo" : "photos"}`}
        </span>
      </span>

      {/* What's in the folder, for screen readers. */}
      <span id={descriptionId} className="sr-only">
        {shown.map((image) => image.alt).join(". ")}
      </span>
    </button>
  )
}

export { PhotoFolder }
