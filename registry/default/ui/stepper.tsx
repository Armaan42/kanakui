import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepperStep {
  title: string
  description?: string
}

interface StepperProps extends Omit<React.ComponentProps<"ol">, "children"> {
  steps: StepperStep[]
  /** Index of the current step (0-based). Earlier steps show as complete. */
  current: number
  orientation?: "horizontal" | "vertical"
}

/**
 * Progress through a multi-step flow, e.g. checkout or onboarding. An ordered
 * list where the current step has `aria-current="step"` and finished steps
 * say "completed" to screen readers. Works in Server Components.
 */
function Stepper({ steps, current, orientation = "horizontal", className, ...props }: StepperProps) {
  const vertical = orientation === "vertical"
  return (
    <ol
      data-slot="stepper"
      className={cn(vertical ? "space-y-6" : "flex w-full items-start", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const state = index < current ? "complete" : index === current ? "current" : "upcoming"
        return (
          <li
            key={step.title}
            aria-current={state === "current" ? "step" : undefined}
            className={cn("relative flex gap-3", vertical ? "" : "flex-1 flex-col items-center text-center")}
          >
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute bg-border",
                  vertical ? "top-8 left-3.5 h-[calc(100%-1rem)] w-px" : "top-3.5 left-[calc(50%+1rem)] h-px w-[calc(100%-2rem)]",
                  index < current && "bg-foreground"
                )}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                state === "complete" && "border-foreground bg-foreground text-background",
                state === "current" && "border-foreground bg-background ring-4 ring-foreground/10",
                state === "upcoming" && "bg-background text-muted-foreground"
              )}
            >
              {state === "complete" ? <Check className="size-3.5" /> : index + 1}
            </span>
            <div className={vertical ? "" : "mt-1"}>
              <p className={cn("text-sm font-medium", state === "upcoming" && "text-muted-foreground")}>
                {step.title}
                {state === "complete" ? <span className="sr-only"> (completed)</span> : null}
              </p>
              {step.description ? <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper, type StepperProps, type StepperStep }
