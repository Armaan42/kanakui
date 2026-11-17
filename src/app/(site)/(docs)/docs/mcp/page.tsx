import type { Metadata } from "next"
import Link from "next/link"

import { CodeViewer } from "@/components/site/code-viewer"
import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle } from "@/components/site/docs-article"
import { BulletList, DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { registrySetupCommand, siteConfig } from "@/config/site"
import { getSnippet } from "@/lib/source"

const HREF = "/docs/mcp"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const p = "text-sm leading-6 text-muted-foreground"
const link = "text-foreground underline underline-offset-4"

/*
 * Everything here was run against the live registry with shadcn 4.23
 * (Nov 2026): `mcp init` for every client, then the MCP server's tools
 * called over stdio with @kanakui configured.
 */
const CLIENTS = [
  { client: "claude", name: "Claude Code", result: "Writes `.mcp.json`." },
  { client: "cursor", name: "Cursor", result: "Writes `.cursor/mcp.json`." },
  { client: "vscode", name: "VS Code", result: "Writes `.vscode/mcp.json`." },
  { client: "opencode", name: "OpenCode", result: "Writes `opencode.json`." },
  { client: "codex", name: "Codex", result: "Writes nothing. Prints a snippet to add to `~/.codex/config.toml` yourself." },
]

const MCP_JSON = {
  mcpServers: { shadcn: { command: "npx", args: ["shadcn@latest", "mcp"] } },
}

export default async function McpPage() {
  const ns = siteConfig.registry.namespace
  const mcpJson = await getSnippet(JSON.stringify(MCP_JSON, null, 2), "json", ".mcp.json")

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="how" title="How it works">
        <p className={p}>
          <InlineText
            text={`The shadcn CLI includes an MCP server. Your assistant uses it to list, search and read items from every registry in your \`components.json\`, and to get the command that installs them. Add \`${ns}\` to that file and kanakui shows up next to the official shadcn components.`}
          />
        </p>
        <p className={p}>
          <InlineText text="Run both steps inside a project that’s already set up with shadcn (it needs `components.json` and `tsconfig.json`). New project? Start with the " />
          <Link href="/docs/installation" className={link}>
            Installation guide
          </Link>
          .
        </p>
      </DocsSection>

      <DocsSection id="registry" title={`1. Add the ${ns} registry`}>
        <p className={p}>Once per project. It adds one line to the registries in your components.json.</p>
        <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" />
      </DocsSection>

      <DocsSection id="connect" title="2. Connect your assistant">
        <CommandBlock command="npx shadcn@latest mcp init --client claude" copyLabel="Copy MCP setup command" />
        <p className={p}>
          <InlineText text="Swap `claude` for your assistant. Each one stores the setup in a different place:" />
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">Assistant</th>
                <th scope="col" className="px-4 py-2 font-medium">--client</th>
                <th scope="col" className="px-4 py-2 font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {CLIENTS.map((row) => (
                <tr key={row.client}>
                  <td className="px-4 py-2.5 whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[13px]">{row.client}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <InlineText text={row.result} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={p}>For Claude Code the file looks like this. Restart your assistant afterwards so it picks the server up.</p>
        <CodeViewer files={[mcpJson]} label=".mcp.json" />
      </DocsSection>

      <DocsSection id="ask" title="3. Ask for components">
        <p className={p}>Mention the registry by name so the assistant searches it. For example:</p>
        <BulletList
          items={[
            `“Find a pricing block in the ${ns} registry.”`,
            `“Show me what \`${ns}/shimmer-button\` installs.”`,
            `“Add \`${ns}/hero-10\` and use it on the home page.”`,
          ]}
        />
        <p className={p}>
          <InlineText text="Behind the scenes it calls tools such as `search_items_in_registries`, `view_items_in_registries` and `get_add_command_for_items`, then runs the same `npx shadcn@latest add` command you would." />
        </p>
      </DocsSection>

      <DocsSection id="llms" title="llms.txt">
        <p className={p}>
          Assistants without MCP can read{" "}
          <a href="/llms.txt" className={link}>
            /llms.txt
          </a>{" "}
          instead: a plain-text list of every guide, component, block and template with its description and install command.
        </p>
      </DocsSection>

      <DocsSection id="troubleshooting" title="Troubleshooting">
        <dl className="divide-y rounded-lg border">
          {[
            {
              problem: `The assistant can’t find \`${ns}\``,
              solution: `The registry is added per project. Run step 1 in the project the assistant has open, and check that \`components.json\` lists \`${ns}\`.`,
            },
            {
              problem: "`Failed to load tsconfig.json` when running `mcp init`",
              solution: "Run it from your project’s root, next to `components.json` and `tsconfig.json`.",
            },
            {
              problem: "No shadcn tools show up",
              solution: "Restart the assistant (or reload its MCP servers) after `mcp init`.",
            },
          ].map((entry) => (
            <div key={entry.problem} className="space-y-1 px-4 py-3 text-sm">
              <dt className="font-medium">
                <InlineText text={entry.problem} />
              </dt>
              <dd className="leading-6 text-muted-foreground">
                <InlineText text={entry.solution} />
              </dd>
            </div>
          ))}
        </dl>
      </DocsSection>
    </DocsArticle>
  )
}
