import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { installCommand, siteConfig } from "@/config/site";

// Phase 1 placeholder. It checks that Tailwind v4, shadcn theme tokens,
// the Geist font and site config are all wired up. Replaced in Phase 3.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-24">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {siteConfig.registry.namespace} · in development
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
        <p className="text-lg text-muted-foreground">{siteConfig.description}</p>
      </div>

      <pre className="overflow-x-auto rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
        <code>{installCommand("animated-card")}</code>
      </pre>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a
            href="https://ui.shadcn.com/docs/registry"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn registry docs
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            Next.js docs
          </a>
        </Button>
      </div>
    </main>
  );
}
