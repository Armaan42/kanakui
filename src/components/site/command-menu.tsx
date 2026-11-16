"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Blocks, CornerDownLeft, Download, FileText, LayoutGrid, LayoutTemplate, Moon, Search, Sun } from "lucide-react"

import { setMode } from "@/components/site/theme-config"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface SearchLink {
  title: string
  href: string
  /** Shown after the title, e.g. a component's category. */
  hint?: string
  /** Extra words that should match, e.g. the item's name and description. */
  keywords?: string[]
}

export interface SearchGroup {
  id: "pages" | "installation" | "templates" | "components" | "blocks"
  heading: string
  links: SearchLink[]
}

const GROUP_ICON = {
  pages: FileText,
  installation: Download,
  templates: LayoutTemplate,
  components: LayoutGrid,
  blocks: Blocks,
} as const

function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1 font-sans text-[11px] font-medium text-muted-foreground select-none",
        className,
      )}
    >
      {children}
    </kbd>
  )
}

/** Whether a key press happened while the user was typing in a field (so "/" shouldn't open the menu). */
function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
}

/**
 * Ranks an item for a search: every word must appear somewhere in the item
 * (no scattered-letter matches), and items whose title starts with the search
 * come first. Values start with the item's title.
 */
function filter(value: string, search: string, keywords?: string[]) {
  const haystack = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase()
  const query = search.trim().toLowerCase()
  if (!query) return 1
  if (!query.split(/\s+/).every((word) => haystack.includes(word))) return 0
  if (haystack.startsWith(query)) return 1
  const title = value.split(" | ")[0].toLowerCase()
  return title.includes(query) ? 0.8 : 0.5
}

/** "⌘" on Apple devices, "Ctrl" elsewhere. Assumes Apple during server rendering. */
function useModifierKey() {
  return React.useSyncExternalStore(
    () => () => {},
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "⌘"
  )
}

/**
 * Site-wide search: a header button and ⌘K / Ctrl+K (or "/") open a command
 * menu over every docs page, template, component and block, plus theme
 * switching. The list is built on the server and filtered here as you type.
 */
export function CommandMenu({ groups }: { groups: SearchGroup[] }) {
  const router = useRouter()
  const modifier = useModifierKey()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === "/" && !isTyping(event.target)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  const enterHint = (
    <CommandShortcut className="opacity-0 group-data-selected/command-item:opacity-100">
      <CornerDownLeft aria-hidden="true" className="size-3.5" />
    </CommandShortcut>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search components, blocks and docs"
        aria-keyshortcuts="Meta+K Control+K"
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-lg text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
          "size-8 justify-center hover:bg-muted lg:w-56 lg:justify-start lg:border lg:bg-muted/40 lg:pr-1.5 lg:pl-2.5 xl:w-64",
        )}
      >
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <span className="hidden flex-1 text-left lg:inline">Search…</span>
        <span className="hidden items-center gap-0.5 lg:inline-flex" aria-hidden="true">
          <Kbd>{modifier}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {/* Built from Dialog + Command (not CommandDialog) so the title sits inside
          the dialog content and names it for screen readers. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="top-[12svh] translate-y-0 gap-0 overflow-hidden rounded-xl! p-0 sm:max-w-xl">
          <DialogTitle className="sr-only">Search kanakui</DialogTitle>
          <DialogDescription className="sr-only">Search components, blocks, templates and docs</DialogDescription>
          <Command filter={filter} className="rounded-none! bg-transparent">
            <CommandInput placeholder="Search components, blocks, pages…" className="h-10 text-[15px]" />
            <CommandList className="max-h-[min(60svh,26rem)] px-1">
              <CommandEmpty>No results. Try a component name like “globe” or “button”.</CommandEmpty>

              {groups.map((group) => {
                const Icon = GROUP_ICON[group.id]
                return (
                  <CommandGroup key={group.id} heading={group.heading}>
                    {group.links.map((link) => (
                      <CommandItem
                        key={link.href}
                        value={`${link.title} | ${group.heading} ${link.href}`}
                        keywords={link.keywords}
                        onSelect={() => run(() => router.push(link.href))}
                        className="h-10 gap-3"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-md border bg-muted/50">
                          <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
                        </span>
                        <span className="truncate">{link.title}</span>
                        {link.hint ? <span className="truncate text-xs text-muted-foreground">{link.hint}</span> : null}
                        {enterHint}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}

              <CommandGroup heading="Theme">
                {(["light", "dark"] as const).map((mode) => {
                  const Icon = mode === "light" ? Sun : Moon
                  return (
                    <CommandItem key={mode} value={`Switch to ${mode} theme`} onSelect={() => run(() => setMode(mode))} className="h-10 gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-md border bg-muted/50">
                        <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
                      </span>
                      {mode === "light" ? "Switch to light theme" : "Switch to dark theme"}
                      {enterHint}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>

            <div className="flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground" aria-hidden="true">
              <span className="inline-flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                to navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Kbd>↵</Kbd>
                to open
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5">
                <Kbd>esc</Kbd>
                to close
              </span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
