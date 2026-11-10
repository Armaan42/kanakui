"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface TagInputProps {
  /** Visible label for the field. */
  label: string
  /** Controlled tags. */
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (tags: string[]) => void
  /** Maximum number of tags. */
  max?: number
  placeholder?: string
  className?: string
}

/**
 * Type and press Enter or comma to add a tag; Backspace in an empty field
 * removes the last one. Each tag has a labelled remove button, and changes
 * are announced to screen readers. Duplicates are ignored.
 */
function TagInput({ label, value: controlled, defaultValue = [], onValueChange, max, placeholder = "Add a tag…", className }: TagInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState("")
  const [announcement, setAnnouncement] = React.useState("")
  const tags = controlled ?? internal
  const id = React.useId()
  const full = max !== undefined && tags.length >= max

  function update(next: string[], message: string) {
    if (controlled === undefined) setInternal(next)
    onValueChange?.(next)
    setAnnouncement(message)
  }

  function add(raw: string) {
    const tag = raw.trim()
    if (!tag || tags.includes(tag) || full) return
    update([...tags, tag], `Added ${tag}`)
    setDraft("")
  }

  return (
    <div data-slot="tag-input" className={cn("w-full space-y-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border px-2 py-1.5 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <ul className="contents">
          {tags.map((tag) => (
            <li key={tag} className="inline-flex items-center gap-1 rounded-md bg-muted py-0.5 pr-1 pl-2 text-sm">
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => update(tags.filter((t) => t !== tag), `Removed ${tag}`)}
                className="inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X aria-hidden="true" className="size-3" />
              </button>
            </li>
          ))}
        </ul>
        <input
          id={id}
          value={draft}
          disabled={full}
          placeholder={full ? `Up to ${max} tags` : placeholder}
          onChange={(event) => {
            const text = event.target.value
            if (text.endsWith(",")) add(text.slice(0, -1))
            else setDraft(text)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              add(draft)
            } else if (event.key === "Backspace" && !draft && tags.length > 0) {
              const last = tags[tags.length - 1]
              update(tags.slice(0, -1), `Removed ${last}`)
            }
          }}
          onBlur={() => add(draft)}
          className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}

export { TagInput, type TagInputProps }
