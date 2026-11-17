import { Accessibility, FileCode2, Scale, SunMoon, Terminal } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * A strip of plain facts under the hero, standing in for social proof until
 * there are real numbers to show. Each line must stay true of every item.
 */
export function HomeFeatures() {
  const features = [
    { icon: FileCode2, title: "You own the code", text: "The source is copied into your repo. No package to fight." },
    { icon: Terminal, title: "One-command install", text: "Uses the official shadcn CLI, and works with its MCP server." },
    { icon: Accessibility, title: "Accessible", text: "Keyboard support, real labels, and reduced motion respected." },
    { icon: SunMoon, title: "Light, dark, themed", text: "Built on your theme’s CSS variables, in both modes." },
    { icon: Scale, title: `${siteConfig.license.name} licensed`, text: "Free for personal and commercial projects." },
  ]

  return (
    <section aria-label={`Why ${siteConfig.name}`} className="relative isolate border-b">
      {/* Faint dot grid, fading out at the sides so the band has edges without a box. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] mask-x-from-70% mask-x-to-100%"
      />
      {/* Two columns below lg (the odd one out spans both), five in a row from lg. */}
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:gap-y-8 sm:px-6 sm:py-10 lg:grid-cols-5 lg:gap-x-8">
        {features.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className={cn(i === features.length - 1 && "col-span-2 lg:col-span-1")}>
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border bg-background shadow-xs">
                <Icon aria-hidden="true" className="size-4 text-violet-600 dark:text-violet-300" />
              </span>
              <p className="text-[15px] leading-5 font-medium tracking-tight">{title}</p>
            </div>
            {/* Phones show the titles only, so the strip stays short. */}
            <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground max-sm:hidden">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
