import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/utils"

interface CommandBlockProps {
  command: string
  /** Accessible name for the copy button. */
  copyLabel?: string
  className?: string
}

/** A single terminal command with a copy button. Long commands scroll inside the block. */
export function CommandBlock({ command, copyLabel = "Copy command", className }: CommandBlockProps) {
  return (
    <div className={cn("flex min-w-0 items-center rounded-lg border bg-muted/40", className)}>
      <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-[13px] leading-6">
        <code>
          <span aria-hidden="true" className="text-muted-foreground select-none">
            ${" "}
          </span>
          {command}
        </code>
      </pre>
      <CopyButton value={command} label={copyLabel} className="mr-2 shrink-0" />
    </div>
  )
}
