import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { componentDocs } from "@/registry/docs"
import { CodeViewer } from "@/components/site/code-viewer"
import { ComponentGrid } from "@/components/site/component-card"
import { BulletList, DocsSection, InlineText, PropsTable } from "@/components/site/docs"
import { InstallTabs } from "@/components/site/install-tabs"
import { PreviewFrame } from "@/components/site/preview-frame"
import { Badge } from "@/components/ui/badge"
import { registrySetupCommand, siteConfig } from "@/config/site"
import { formatDate } from "@/lib/format"
import {
  getCategoryTitle,
  getComponent,
  getComponents,
  getInstalledFiles,
  getInternalDependencies,
  getNpmDependencies,
  getRelatedComponents,
} from "@/lib/registry"
import { getUsageExample } from "@/lib/source"

export function generateStaticParams() {
  return getComponents().map((component) => ({ name: component.name }))
}

export async function generateMetadata({ params }: PageProps<"/components/[name]">): Promise<Metadata> {
  const { name } = await params
  const component = getComponent(name)
  if (!component) return {}
  return { title: component.title, description: component.description }
}

const TYPE_LABEL: Record<string, string> = {
  "registry:hook": "Hook",
  "registry:lib": "Utility",
  "registry:ui": "Component",
  "registry:component": "Component",
  "registry:block": "Block",
}

/** Applies to every component, so it lives here rather than in each item's docs. */
const COMMON_TROUBLESHOOTING = [
  {
    problem: `\`Unknown registry "${siteConfig.registry.namespace}"\``,
    solution: `Your project doesn't know the namespace yet. Run \`${registrySetupCommand()}\` once, or install by URL from the CLI tab.`,
  },
  {
    problem: "`No components.json found`",
    solution: "Run `npx shadcn@latest init` in your project first.",
  },
]

export default async function ComponentPage({ params }: PageProps<"/components/[name]">) {
  const { name } = await params
  const component = getComponent(name)
  if (!component) notFound()

  const docs = componentDocs[component.name]
  const primaryCategory = component.categories[0]
  const npmDependencies = getNpmDependencies(component)
  const internalDependencies = getInternalDependencies(component)
  const installedFiles = getInstalledFiles(component)
  const related = getRelatedComponents(component, 3)
  const usage = await getUsageExample(component.name)
  const troubleshooting = [...(docs?.troubleshooting ?? []), ...COMMON_TROUBLESHOOTING]

  const toc = [
    { id: "installation", title: "Installation" },
    { id: "files", title: "Files" },
    ...(usage ? [{ id: "usage", title: "Usage" }] : []),
    ...(docs ? [{ id: "api", title: "API reference" }] : []),
    ...(docs ? [{ id: "requirements", title: "Requirements" }] : []),
    ...(docs ? [{ id: "customization", title: "Customization" }] : []),
    ...(docs ? [{ id: "accessibility", title: "Accessibility" }] : []),
    { id: "troubleshooting", title: "Troubleshooting" },
  ]

  return (
    <div className="page-container space-y-10 py-8 sm:py-12">
      <div className="space-y-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/components" className="hover:text-foreground">
                Components
              </Link>
            </li>
            {primaryCategory ? (
              <li className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5" />
                <Link href={`/components/category/${primaryCategory}`} className="hover:text-foreground">
                  {getCategoryTitle(primaryCategory)}
                </Link>
              </li>
            ) : null}
            <li className="flex items-center gap-1">
              <ChevronRight aria-hidden="true" className="size-3.5" />
              <span aria-current="page" className="text-foreground">
                {component.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{component.title}</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{component.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="outline" className="font-mono">
              v{component.version}
            </Badge>
            {component.categories.map((category) => (
              <Badge key={category} asChild variant="outline">
                <Link href={`/components/category/${category}`}>{getCategoryTitle(category)}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <section aria-label="Preview">
        <PreviewFrame name={component.name} title={component.title} />
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 space-y-12">
          <DocsSection id="installation" title="Installation">
            <InstallTabs name={component.name} npmDependencies={npmDependencies} />
          </DocsSection>

          <DocsSection id="files" title="Files added to your project">
            <p className="text-sm text-muted-foreground">
              <InlineText text="Paths use the default shadcn aliases. The CLI follows the aliases in your `components.json`." />
            </p>
            <ul className="divide-y rounded-lg border">
              {installedFiles.map((file) => (
                <li key={file.path} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                  <code className="font-mono text-[13px] break-all">{file.path}</code>
                  {file.fromItem !== component.name ? (
                    <span className="text-xs text-muted-foreground">from {file.fromItem}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </DocsSection>

          {usage ? (
            <DocsSection id="usage" title="Usage">
              <p className="text-sm text-muted-foreground">The code behind the preview above.</p>
              <CodeViewer files={[usage]} label="Usage example" />
            </DocsSection>
          ) : null}

          {docs ? (
            <>
              <DocsSection id="api" title="API reference">
                <PropsTable props={docs.props} extendsText={docs.extends} />
              </DocsSection>
              <DocsSection id="requirements" title="Requirements">
                <BulletList items={docs.requirements} />
              </DocsSection>
              <DocsSection id="customization" title="Customization">
                <BulletList items={docs.customization} />
              </DocsSection>
              <DocsSection id="accessibility" title="Accessibility">
                <BulletList items={docs.accessibility} />
              </DocsSection>
            </>
          ) : null}

          <DocsSection id="troubleshooting" title="Troubleshooting">
            <dl className="divide-y rounded-lg border">
              {troubleshooting.map((item) => (
                <div key={item.problem} className="space-y-1 px-4 py-3 text-sm">
                  <dt className="font-medium">
                    <InlineText text={item.problem} />
                  </dt>
                  <dd className="leading-6 text-muted-foreground">
                    <InlineText text={item.solution} />
                  </dd>
                </div>
              ))}
            </dl>
          </DocsSection>
        </div>

        <aside className="space-y-8 text-sm lg:sticky lg:top-20 lg:max-h-[calc(100svh-6rem)] lg:self-start lg:overflow-y-auto">
          <nav aria-label="On this page" className="hidden space-y-3 lg:block">
            <h2 className="font-medium">On this page</h2>
            <ul className="space-y-1.5">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`} className="text-muted-foreground hover:text-foreground">
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="font-medium">npm packages</h2>
            {npmDependencies.length > 0 ? (
              <ul className="space-y-1.5">
                {npmDependencies.map((dep) => (
                  <li key={dep}>
                    <a
                      href={`https://www.npmjs.com/package/${dep}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[13px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {dep}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">None. Uses React and Tailwind CSS only.</p>
            )}
          </div>

          {internalDependencies.length > 0 ? (
            <div className="space-y-3">
              <h2 className="font-medium">Also installs</h2>
              <ul className="space-y-1.5">
                {internalDependencies.map((dep) => (
                  <li key={dep.name} className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] text-muted-foreground">{dep.name}</span>
                    <span className="text-xs text-muted-foreground">{TYPE_LABEL[dep.type] ?? dep.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-muted-foreground">Released</dt>
            <dd>{formatDate(component.releasedAt)}</dd>
            <dt className="text-muted-foreground">Version</dt>
            <dd className="font-mono text-[13px]">{component.version}</dd>
            <dt className="text-muted-foreground">License</dt>
            <dd>
              <a href={siteConfig.license.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                {siteConfig.license.name}
              </a>
            </dd>
          </dl>
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related" className="space-y-4 border-t pt-10">
          <h2 id="related" className="text-xl font-semibold tracking-tight">
            Related components
          </h2>
          <ComponentGrid components={related} />
        </section>
      ) : null}
    </div>
  )
}
