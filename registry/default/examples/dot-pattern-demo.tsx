import { FolderPlus } from "lucide-react"

import { DotPattern } from "@/registry/default/ui/dot-pattern"

export default function DotPatternDemo() {
  return (
    <div className="relative flex h-64 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border bg-background px-6">
      <DotPattern fade />
      <div className="relative text-center">
        <p className="font-medium">No projects yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Create a project to start tracking issues.</p>
        <button type="button" className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <FolderPlus aria-hidden="true" className="size-4" />
          New project
        </button>
      </div>
    </div>
  )
}
