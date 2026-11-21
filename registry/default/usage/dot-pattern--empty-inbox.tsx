import { Inbox, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DotPattern } from "@/registry/default/ui/dot-pattern"

export const meta = {
  title: "Empty state in an app",
  description: "A faded dot pattern behind the empty state of a support inbox, inside the app's real layout.",
}

// The app is made up.
export default function EmptyInbox() {
  return (
    <div className="flex min-h-svh">
      <nav aria-label="Folders" className="hidden w-52 shrink-0 border-r bg-muted/30 p-3 text-sm sm:block">
        <p className="px-2 py-2 font-semibold">Halden Support</p>
        <ul className="mt-2 space-y-0.5">
          <li className="rounded-md bg-background px-2 py-1.5 font-medium shadow-xs">Open · 0</li>
          <li className="px-2 py-1.5 text-muted-foreground">Waiting on customer · 3</li>
          <li className="px-2 py-1.5 text-muted-foreground">Resolved</li>
        </ul>
      </nav>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b px-4 py-3 text-sm text-muted-foreground">
          <Search aria-hidden="true" className="size-4" />
          Search conversations
        </div>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
          <DotPattern fade />
          <div className="relative max-w-sm text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full border bg-background">
              <Inbox aria-hidden="true" className="size-5" />
            </span>
            <h1 className="mt-4 text-lg font-semibold">No open conversations</h1>
            <p className="mt-1 text-sm text-muted-foreground">Everything is answered. New emails and chats will appear here as they arrive.</p>
            <Button variant="outline" className="mt-5">
              <Plus aria-hidden="true" />
              Start a conversation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
