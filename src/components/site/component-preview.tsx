"use client"

import * as React from "react"

import { demos } from "@/__registry__/demos"
import { cn } from "@/lib/utils"

// One lazy component per demo, created once. Each demo is its own JS chunk,
// so heavy dependencies (e.g. motion) load only when that preview mounts.
const lazyDemos: Record<string, React.LazyExoticComponent<React.ComponentType>> =
  Object.fromEntries(Object.entries(demos).map(([name, load]) => [name, React.lazy(load)]))

interface ComponentPreviewProps {
  name: string
  /**
   * Render immediately (detail page). Otherwise the demo mounts only when the
   * preview scrolls near the viewport, so listing pages don't load every
   * component at once.
   */
  eager?: boolean
  /** Full-width, unpadded canvas for blocks (page sections). */
  fill?: boolean
  className?: string
}

export function ComponentPreview({ name, eager = false, fill = false, className }: ComponentPreviewProps) {
  const Demo = lazyDemos[name]
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(eager)

  React.useEffect(() => {
    if (inView) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  return (
    <div
      ref={ref}
      data-slot="component-preview"
      className={cn(
        fill
          ? "relative w-full bg-background"
          : "relative flex items-center justify-center overflow-hidden bg-background p-6 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]",
        className
      )}
    >
      {!Demo ? (
        <p className="text-sm text-muted-foreground">No preview available.</p>
      ) : inView ? (
        <PreviewErrorBoundary name={name}>
          <React.Suspense fallback={<PreviewSkeleton />}>
            <Demo />
          </React.Suspense>
        </PreviewErrorBoundary>
      ) : (
        <PreviewSkeleton />
      )}
    </div>
  )
}

function PreviewSkeleton() {
  return (
    <div role="status" className="h-24 w-full max-w-56 animate-pulse rounded-lg bg-muted motion-reduce:animate-none">
      <span className="sr-only">Loading preview</span>
    </div>
  )
}

interface BoundaryProps {
  name: string
  children: React.ReactNode
}

/** Keeps one broken demo from taking down the whole page. */
class PreviewErrorBoundary extends React.Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(`Preview "${this.props.name}" failed to render`, error)
  }

  render() {
    if (this.state.failed) {
      return <p className="text-sm text-muted-foreground">This preview failed to load. Try reloading the page.</p>
    }
    return this.props.children
  }
}
