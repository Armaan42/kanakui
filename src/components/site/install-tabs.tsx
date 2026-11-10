import { CommandBlock } from "@/components/site/command-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { installCommand, installCommandByUrl, registrySetupCommand, siteConfig } from "@/config/site"

/**
 * Both install paths were verified end to end against the live registry:
 * - by URL: works in any project set up with shadcn, no configuration;
 * - by namespace: needs the one-time `registry add` until the namespace is
 *   listed in shadcn's public registry index.
 */
export function InstallTabs({ name }: { name: string }) {
  return (
    <Tabs defaultValue="cli" className="gap-4">
      <TabsList variant="line">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="namespace">Namespace</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="space-y-3">
        <CommandBlock command={installCommandByUrl(name)} copyLabel="Copy install command" />
        <p className="text-sm text-muted-foreground">
          Run this in a project set up with shadcn. If you haven’t set it up yet, run{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]">npx shadcn@latest init</code> first.
        </p>
      </TabsContent>

      <TabsContent value="namespace" className="space-y-4">
        <ol className="space-y-4">
          <li className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">1.</span> Add the{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]">{siteConfig.registry.namespace}</code>{" "}
              registry to your project. You only need to do this once.
            </p>
            <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" />
          </li>
          <li className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">2.</span> Install the component.
            </p>
            <CommandBlock command={installCommand(name)} copyLabel="Copy namespaced install command" />
          </li>
        </ol>
      </TabsContent>
    </Tabs>
  )
}
