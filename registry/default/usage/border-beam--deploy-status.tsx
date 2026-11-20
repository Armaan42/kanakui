import { CheckCircle2, GitBranch, Loader, XCircle } from "lucide-react"

import { BorderBeam } from "@/registry/default/ui/border-beam"

export const meta = {
  title: "Deployments list",
  description: "The beam marks the one deployment still building, so it stands out from finished ones in a dashboard list.",
}

// The project, commits and people are made up.
const DEPLOYS = [
  { id: "3f9c2ab", message: "Add annual billing toggle", branch: "main", author: "Lena", time: "Building · 40 s", status: "building" },
  { id: "a81d07e", message: "Fix date picker on small screens", branch: "main", author: "Tomás", time: "2 min · 18 min ago", status: "ready" },
  { id: "c47be19", message: "Try new onboarding checklist", branch: "onboarding-v2", author: "Mei", time: "Failed after 1 min", status: "failed" },
  { id: "e02f6d3", message: "Bump dependencies", branch: "main", author: "Aditya", time: "2 min · yesterday", status: "ready" },
] as const

export default function DeployStatus() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Deployments</h1>
          <p className="mt-1 text-sm text-muted-foreground">oakline-web · production</p>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {DEPLOYS.map((deploy) => (
          <li key={deploy.id} className="relative flex items-center gap-4 rounded-xl border bg-card p-4">
            {deploy.status === "building" ? (
              <Loader aria-label="Building" className="size-5 shrink-0 animate-spin text-muted-foreground motion-reduce:animate-none" />
            ) : deploy.status === "ready" ? (
              <CheckCircle2 aria-label="Ready" className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle aria-label="Failed" className="size-5 shrink-0 text-destructive" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{deploy.message}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <GitBranch aria-hidden="true" className="size-3.5" />
                  {deploy.branch}
                </span>
                <span className="font-mono text-xs">{deploy.id}</span>
                <span>by {deploy.author}</span>
              </p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{deploy.time}</span>
            {deploy.status === "building" ? <BorderBeam /> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
