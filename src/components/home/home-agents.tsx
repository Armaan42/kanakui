import { Collage } from "@/components/home/collage"
import { CommandBlock } from "@/components/site/command-block"
import { registrySetupCommand } from "@/config/site"

// `shadcn mcp init --client` accepts claude, cursor, vscode, codex and opencode.
const MCP_INIT = "npx shadcn@latest mcp init --client claude"

/**
 * "Copy, paste, or let your AI agent install it": the heading and the two
 * commands that connect an agent through the shadcn MCP server, beside a
 * collage of live blocks and components. A dark stage in both themes.
 */
export function HomeAgents() {
  const heading = (
    <div className="max-w-xl">
      <h2 id="agents" className="text-4xl font-semibold tracking-tighter text-balance sm:text-5xl">
        Copy, paste, or let your{" "}
        <span className="bg-linear-to-r from-violet-300 to-sky-300 bg-clip-text whitespace-nowrap text-transparent">AI agent</span>{" "}
        install it.
      </h2>
      <p className="mt-5 text-pretty text-muted-foreground">
        Every component is plain source in the open shadcn registry format. Add the @kanakui registry once, connect the
        shadcn MCP server, and Claude Code, Cursor, VS Code, Codex or OpenCode can find and install kanakui components
        for you.
      </p>
      <ol className="mt-7 space-y-3">
        <li className="space-y-1.5">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">1 · Add the registry</p>
          <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" className="border-white/10 bg-black/40" />
        </li>
        <li className="space-y-1.5">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">2 · Connect your agent</p>
          <CommandBlock command={MCP_INIT} copyLabel="Copy MCP setup command" className="border-white/10 bg-black/40" />
          <p className="text-xs text-muted-foreground">
            Using another agent? Swap <code className="font-mono">claude</code> for <code className="font-mono">cursor</code>,{" "}
            <code className="font-mono">vscode</code>, <code className="font-mono">codex</code> or{" "}
            <code className="font-mono">opencode</code>.
          </p>
        </li>
      </ol>
    </div>
  )

  return (
    <section aria-labelledby="agents" className="dark relative isolate overflow-hidden border-b bg-background text-foreground">
      <Collage heading={heading} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"
      />
    </section>
  )
}
