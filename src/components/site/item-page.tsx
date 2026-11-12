import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { componentDocs } from "@/registry/docs"
import type { RegistryEntry } from "@/registry/types"
import { BlockGrid } from "@/components/site/block-card"
import { CodeViewer } from "@/components/site/code-viewer"
import { ComponentGrid } from "@/components/site/component-card"
import { BulletList, DocsSection, InlineText, PropsTable } from "@/components/site/docs"
import { InstallTabs } from "@/components/site/install-tabs"
import { PreviewFrame } from "@/components/site/preview-frame"
import { TemplateGrid } from "@/components/site/template-card"
import { Badge } from "@/components/ui/badge"
import { registrySetupCommand, siteConfig } from "@/config/site"
import { formatDate } from "@/lib/format"
import {
  getCategoryTitle,
  getItem,
  getInstalledFiles,
  getInternalDependencies,
  getNpmDependencies,
  getRelated,
  getShadcnDependencies,
  type ItemKind,
} from "@/lib/registry"
import { getUsageExample } from "@/lib/source"

const TYPE_LABEL: Record<string, string> = {
  "registry:hook": "Hook",
  "registry:lib": "Utility",
  "registry:ui": "Component",
  "registry:component": "Component",
  "registry:block": "Block",
}

const SECTION_TITLE: Record<ItemKind, string> = { components: "Components", blocks: "Blocks", templates: "Templates" }

/** Applies to every item, so it lives here rather than in each item's docs. */
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

/** The detail page shared by /components/[name], /blocks/[name] and /templates/[name]. */
export async function ItemPage({ item, kind }: { item: RegistryEntry; kind: ItemKind }) {
  const docs = componentDocs[item.name]
  const isTemplate = kind === "templates"
  // Templates all share one category, so it adds nothing to the breadcrumb or badges.
  const categories = isTemplate ? [] : item.categories
  const primaryCategory = categories[0]
  // A template's direct dependencies are its sections, in page order.
  const sections = isTemplate
    ? (item.internalDependencies ?? []).flatMap((name) => getItem("blocks", name) ?? [])
    : []
  const npmDependencies = getNpmDependencies(item)
  const shadcnDependencies = getShadcnDependencies(item)
  const internalDependencies = getInternalDependencies(item)
  const installedFiles = getInstalledFiles(item)
  const related = getRelated(item, kind === "components" ? 3 : 2)
  const usage = await getUsageExample(item.name)
  const troubleshooting = [...(docs?.troubleshooting ?? []), ...COMMON_TROUBLESHOOTING]

  const toc = [
    { id: "installation", title: "Installation" },
    ...(sections.length ? [{ id: "sections", title: "Sections" }] : []),
    { id: "files", title: "Files" },
    ...(usage ? [{ id: "usage", title: "Usage" }] : []),
    ...(docs
      ? [
          { id: "api", title: "API reference" },
          { id: "requirements", title: "Requirements" },
          { id: "customization", title: "Customization" },
          { id: "accessibility", title: "Accessibility" },
        ]
      : []),
    { id: "troubleshooting", title: "Troubleshooting" },
  ]

  return (
    <div className="page-container space-y-10 py-8 sm:py-12">
      <div className="space-y-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href={`/${kind}`} className="hover:text-foreground">
                {SECTION_TITLE[kind]}
              </Link>
            </li>
            {primaryCategory ? (
              <li className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5" />
                <Link href={`/${kind}/category/${primaryCategory}`} className="hover:text-foreground">
                  {getCategoryTitle(primaryCategory)}
                </Link>
              </li>
            ) : null}
            <li className="flex items-center gap-1">
              <ChevronRight aria-hidden="true" className="size-3.5" />
              <span aria-current="page" className="text-foreground">
                {item.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{item.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="outline" className="font-mono">
              v{item.version}
            </Badge>
            {sections.length ? <Badge variant="outline">{sections.length} sections</Badge> : null}
            {categories.map((category) => (
              <Badge key={category} asChild variant="outline">
                <Link href={`/${kind}/category/${category}`}>{getCategoryTitle(category)}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <section aria-label="Preview">
        <PreviewFrame name={item.name} title={item.title} tall={kind !== "components"} />
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 space-y-12">
          <DocsSection id="installation" title="Installation">
            <InstallTabs name={item.name} npmDependencies={npmDependencies} shadcnDependencies={shadcnDependencies} />
          </DocsSection>

          {sections.length ? (
            <DocsSection id="sections" title="Sections">
              <p className="text-sm text-muted-foreground">
                The blocks this page is made of, top to bottom. Each one is also on its own page.
              </p>
              <ol className="divide-y rounded-lg border">
                {sections.map((block, index) => (
                  <li key={block.name}>
                    <Link
                      href={`/blocks/${block.name}`}
                      className="group flex items-center gap-4 px-4 py-2.5 text-sm outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="w-5 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-medium group-hover:underline group-hover:underline-offset-4">{block.title}</span>
                        <span className="ml-2 font-mono text-xs text-muted-foreground">{block.name}</span>
                      </span>
                      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ol>
            </DocsSection>
          ) : null}

          <DocsSection id="files" title="Files added to your project">
            <p className="text-sm text-muted-foreground">
              <InlineText text="Paths use the default shadcn aliases. The CLI follows the aliases in your `components.json`." />
            </p>
            <ul className="divide-y rounded-lg border">
              {installedFiles.map((file) => (
                <li key={file.path} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                  <code className="font-mono text-[13px] break-all">{file.path}</code>
                  {file.fromItem !== item.name ? (
                    <span className="text-xs text-muted-foreground">from {file.fromItem}</span>
                  ) : null}
                </li>
              ))}
            </ul>
            {shadcnDependencies.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                <InlineText
                  text={`Also adds the shadcn ${shadcnDependencies.map((d) => `\`${d}\``).join(", ")} ${shadcnDependencies.length === 1 ? "component" : "components"} if your project doesn't have ${shadcnDependencies.length === 1 ? "it" : "them"} yet.`}
                />
              </p>
            ) : null}
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
              {troubleshooting.map((entry) => (
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

          {internalDependencies.length > 0 || shadcnDependencies.length > 0 ? (
            <div className="space-y-3">
              <h2 className="font-medium">Also installs</h2>
              <ul className="space-y-1.5">
                {internalDependencies.map((dep) => (
                  <li key={dep.name} className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] text-muted-foreground">{dep.name}</span>
                    <span className="text-xs text-muted-foreground">{TYPE_LABEL[dep.type] ?? dep.type}</span>
                  </li>
                ))}
                {shadcnDependencies.map((dep) => (
                  <li key={dep} className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] text-muted-foreground">{dep}</span>
                    <span className="text-xs text-muted-foreground">shadcn</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-muted-foreground">Released</dt>
            <dd>{formatDate(item.releasedAt)}</dd>
            <dt className="text-muted-foreground">Version</dt>
            <dd className="font-mono text-[13px]">{item.version}</dd>
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
            {isTemplate ? "More templates" : `Related ${kind}`}
          </h2>
          {isTemplate ? (
            <TemplateGrid templates={related} />
          ) : kind === "blocks" ? (
            <BlockGrid blocks={related} />
          ) : (
            <ComponentGrid components={related} />
          )}
        </section>
      ) : null}
    </div>
  )
}
