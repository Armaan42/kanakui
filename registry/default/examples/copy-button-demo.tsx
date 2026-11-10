import { CopyButton } from "@/registry/default/ui/copy-button"

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <code className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-sm">npm install motion</code>
      <CopyButton value="npm install motion" aria-label="Copy install command" />
      <CopyButton value="npm install motion">Copy</CopyButton>
    </div>
  )
}
