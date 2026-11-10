import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { ComponentGrid } from "@/components/site/component-card"
import { ComponentPreview } from "@/components/site/component-preview"
import { InstallTabs } from "@/components/site/install-tabs"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"
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

export default async function ComponentPage({ params }: PageProps<"/components/[name]">) {
  const { name } = await params
  const component = getComponent(name)
  if (!component) notFound()

  const primaryCategory = component.categories[0]
  const npmDependencies = getNpmDependencies(component)
  const internalDependencies = getInternalDependencies(component)
  const installedFiles = getInstalledFiles(component)
  const related = getRelatedComponents(component, 3)

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
        <ComponentPreview name={component.name} eager className="min-h-80 rounded-xl border sm:min-h-96" />
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="installation" className="space-y-4">
            <h2 id="installation" className="text-xl font-semibold tracking-tight">
              Installation
            </h2>
            <InstallTabs name={component.name} />
          </section>

          <section aria-labelledby="files" className="space-y-4">
            <h2 id="files" className="text-xl font-semibold tracking-tight">
              Files added to your project
            </h2>
            <p className="text-sm text-muted-foreground">
              Paths use the default shadcn aliases. The CLI follows the aliases in your{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]">components.json</code>.
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
          </section>
        </div>

        <aside className="space-y-8 text-sm">
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
              <a
                href={siteConfig.license.url}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
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
