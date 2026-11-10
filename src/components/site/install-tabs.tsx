import type * as React from "react"

import { CodeViewer } from "@/components/site/code-viewer"
import { CommandBlock } from "@/components/site/command-block"
import { InlineText } from "@/components/site/docs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { installCommand, installCommandByUrl, registrySetupCommand, siteConfig } from "@/config/site"
import { getItemCss, getSourceFiles } from "@/lib/source"

interface StepProps {
  number: number
  /** Instruction text; `backticks` mark inline code. */
  title: string
  children?: React.ReactNode
}

function Step({ number, title, children }: StepProps) {
  return (
    <li className="min-w-0 space-y-3">
      <p className="text-sm">
        <span className="mr-1.5 font-mono text-muted-foreground">{number}.</span>
        <InlineText text={title} />
      </p>
      {children}
    </li>
  )
}

interface InstallTabsProps {
  name: string
  npmDependencies: string[]
  /** shadcn built-ins the item imports, e.g. `button`. */
  shadcnDependencies?: string[]
}

/**
 * CLI (by URL) and Namespace installs were verified end to end against the
 * live registry. Manual shows exactly the files and CSS the CLI would write.
 */
export async function InstallTabs({ name, npmDependencies, shadcnDependencies = [] }: InstallTabsProps) {
  const [sourceFiles, css] = await Promise.all([getSourceFiles(name), getItemCss(name)])

  const manualSteps: Omit<StepProps, "number">[] = [
    { title: "Make sure your project has a `cn` helper at `@/lib/utils`. `npx shadcn@latest init` creates it." },
    ...(shadcnDependencies.length > 0
      ? [
          {
            title: "Add the shadcn components this uses.",
            children: (
              <CommandBlock
                command={`npx shadcn@latest add ${shadcnDependencies.join(" ")}`}
                copyLabel="Copy shadcn add command"
              />
            ),
          },
        ]
      : []),
    ...(npmDependencies.length > 0
      ? [
          {
            title: "Install the npm packages.",
            children: <CommandBlock command={`npm install ${npmDependencies.join(" ")}`} copyLabel="Copy npm install command" />,
          },
        ]
      : []),
    {
      title:
        sourceFiles.length > 1
          ? `Create these ${sourceFiles.length} files and paste in the code.`
          : "Create this file and paste in the code.",
      children: <CodeViewer files={sourceFiles} label="Source files" />,
    },
    ...(css
      ? [
          {
            title: "Add this CSS to your global stylesheet, for example `app/globals.css`.",
            children: <CodeViewer files={[css]} label="CSS to add" />,
          },
        ]
      : []),
    { title: "If your aliases differ from `@/components`, `@/hooks` and `@/lib`, update the import paths to match." },
  ]

  return (
    <Tabs defaultValue="cli" className="gap-4">
      <TabsList variant="line">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="namespace">Namespace</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="space-y-3">
        <CommandBlock command={installCommandByUrl(name)} copyLabel="Copy install command" />
        <p className="text-sm text-muted-foreground">
          <InlineText text="Run this in a project set up with shadcn. If you haven’t set it up yet, run `npx shadcn@latest init` first." />
        </p>
      </TabsContent>

      <TabsContent value="namespace">
        <ol className="space-y-5">
          <Step
            number={1}
            title={`Add the \`${siteConfig.registry.namespace}\` registry to your project. You only need to do this once.`}
          >
            <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" />
          </Step>
          <Step number={2} title="Install the component.">
            <CommandBlock command={installCommand(name)} copyLabel="Copy namespaced install command" />
          </Step>
        </ol>
      </TabsContent>

      <TabsContent value="manual">
        <ol className="space-y-5">
          {manualSteps.map((step, index) => (
            <Step key={step.title} number={index + 1} title={step.title}>
              {step.children}
            </Step>
          ))}
        </ol>
      </TabsContent>
    </Tabs>
  )
}
