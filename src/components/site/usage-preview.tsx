"use client"

import * as React from "react"

import { usageLoaders } from "@/__registry__/usage"

// One lazy component per example, created once, so each example is its own chunk.
const lazyExamples: Record<string, React.LazyExoticComponent<React.ComponentType>> = Object.fromEntries(
  Object.entries(usageLoaders).map(([key, load]) => [key, React.lazy(load)])
)

/** Renders one real-world example full width, as it would sit in a page. */
export function UsagePreview({ name, slug }: { name: string; slug: string }) {
  const Example = lazyExamples[`${name}/${slug}`]
  if (!Example) return <p className="p-6 text-sm text-muted-foreground">No example found.</p>
  return (
    <ExampleBoundary>
      <React.Suspense fallback={<div role="status" className="min-h-svh animate-pulse bg-muted/40 motion-reduce:animate-none"><span className="sr-only">Loading example</span></div>}>
        <Example />
      </React.Suspense>
    </ExampleBoundary>
  )
}

/** Keeps a broken example from blanking the frame. */
class ExampleBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return <p className="p-6 text-sm text-muted-foreground">This example failed to load. Try reloading.</p>
    return this.props.children
  }
}
