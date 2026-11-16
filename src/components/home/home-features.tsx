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
    <section aria-label={`Why ${siteConfig.name}`} className="border-b">
      {/* Two columns below lg (the odd one out spans both), five in a row from lg. */}
      <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-5">
        {features.map(({ icon: Icon, title, text }, i) => {
          const last = i === features.length - 1
          return (
            <li
              key={title}
              className={cn(
                "flex gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:border-b-0 lg:px-5",
                last ? "col-span-2 lg:col-span-1" : "border-b lg:border-r",
                !last && i % 2 === 0 && "border-r"
              )}
            >
              <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-300" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                {/* Phones show the titles only, so the strip stays short. */}
                <p className="mt-1 text-sm text-pretty text-muted-foreground max-sm:hidden">{text}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
