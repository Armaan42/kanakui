import { cn } from "@/lib/utils"

/** The Pulsewise mark and wordmark. Swap in your own logo here. */
export function SaasLandingLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight", className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 shrink-0">
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path
          d="M6 17h4.5l3-7.5 4.5 14 3-8.5 1.5 2H26"
          fill="none"
          className="stroke-primary-foreground"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Pulsewise
    </span>
  )
}
