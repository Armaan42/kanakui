import type * as React from "react"

import type { PropDoc } from "@/registry/docs"

// wrap-anywhere: long commands and URLs in inline code may break mid-token
// instead of pushing the page wider than a phone screen.
const inlineCodeClass = "rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] wrap-anywhere"

/** Renders text where `backticks` mark inline code. */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 1 ? (
          <code key={index} className={inlineCodeClass}>
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  )
}

interface DocsSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

/** A titled section of a component page. `id` is the anchor used by "On this page". */
export function DocsSection({ id, title, children }: DocsSectionProps) {
  return (
    <section aria-labelledby={id} className="scroll-mt-20 space-y-4">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        <a href={`#${id}`} className="hover:underline hover:underline-offset-4">
          {title}
        </a>
      </h2>
      {children}
    </section>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>
          <InlineText text={item} />
        </li>
      ))}
    </ul>
  )
}

export function PropsTable({ props, extendsText }: { props: PropDoc[]; extendsText: string }) {
  return (
    <div className="space-y-3">
      {props.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {props.map((prop) => (
                <tr key={prop.name} className="align-top">
                  <th scope="row" className="px-4 py-3 font-mono text-[13px] font-normal">
                    {prop.name}
                  </th>
                  <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{prop.type}</td>
                  <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{prop.default ?? "—"}</td>
                  <td className="px-4 py-3 leading-6">
                    <InlineText text={prop.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="text-sm text-muted-foreground">
        <InlineText text={extendsText} />
      </p>
    </div>
  )
}
