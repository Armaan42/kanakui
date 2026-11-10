import * as React from "react"

import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends Omit<React.ComponentProps<"input">, "placeholder"> {
  /** Visible label. It sits inside the field and floats up on focus or when filled. */
  label: string
}

/**
 * A text input whose label starts inside the field and moves above the text
 * when the field is focused or has a value. Uses a real `<label>`, so it is
 * announced correctly and clicking it focuses the input. CSS only.
 */
function FloatingLabelInput({ label, id, className, ...props }: FloatingLabelInputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div data-slot="floating-label-input" className={cn("relative w-full", className)}>
      <input
        id={inputId}
        // A blank placeholder lets CSS know when the field is empty (:placeholder-shown).
        placeholder=" "
        className={cn(
          "peer h-12 w-full rounded-lg border bg-transparent px-3 pt-4 text-sm outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute top-1.5 left-3 origin-left text-xs text-muted-foreground transition-all duration-150 motion-reduce:transition-none",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm",
          "peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-foreground"
        )}
      >
        {label}
      </label>
    </div>
  )
}

export { FloatingLabelInput, type FloatingLabelInputProps }
