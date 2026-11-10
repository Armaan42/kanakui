import type * as React from "react"

interface PageHeaderProps {
  title: string
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <div className="text-sm text-muted-foreground">{eyebrow}</div> : null}
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
      {children}
    </div>
  )
}
