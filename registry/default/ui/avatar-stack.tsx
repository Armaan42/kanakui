import * as React from "react"

import { cn } from "@/lib/utils"

interface AvatarStackPerson {
  name: string
  /** Image URL. Without it, initials are shown. */
  src?: string
}

interface AvatarStackProps extends Omit<React.ComponentProps<"div">, "children"> {
  people: AvatarStackPerson[]
  /** Avatars to show before "+N". */
  max?: number
  /** Avatar size in pixels. */
  size?: number
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Overlapping avatars with a "+N" counter. Avatars spread apart on hover.
 * The whole group has one accessible name listing who is included.
 */
function AvatarStack({ people, max = 5, size = 36, className, ...props }: AvatarStackProps) {
  const shown = people.slice(0, max)
  const hidden = people.length - shown.length
  const names = people.map((p) => p.name)
  const summary =
    hidden > 0 ? `${names.slice(0, max).join(", ")} and ${hidden} more` : names.join(", ")

  return (
    <div role="img" aria-label={summary} data-slot="avatar-stack" className={cn("group flex items-center", className)} {...props}>
      {shown.map((person, index) => (
        <span
          key={`${person.name}-${index}`}
          aria-hidden="true"
          className="-ml-2 inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted text-xs font-medium transition-[margin] duration-200 first:ml-0 group-hover:-ml-0.5 motion-reduce:transition-none"
          style={{ width: size, height: size }}
        >
          {person.src ? (
            // A plain <img> keeps the component framework-agnostic; swap in next/image if you like.
            <img src={person.src} alt="" className="size-full object-cover" />
          ) : (
            initials(person.name)
          )}
        </span>
      ))}
      {hidden > 0 ? (
        <span
          aria-hidden="true"
          className="-ml-2 inline-flex shrink-0 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-medium text-background transition-[margin] duration-200 group-hover:-ml-0.5"
          style={{ width: size, height: size }}
        >
          +{hidden}
        </span>
      ) : null}
    </div>
  )
}

export { AvatarStack, type AvatarStackPerson, type AvatarStackProps }
