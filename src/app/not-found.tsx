import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="page-container flex flex-1 flex-col items-start justify-center gap-4 py-24">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist. It may have been renamed or removed.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/components">Browse components</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
