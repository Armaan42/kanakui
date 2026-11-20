import { TextReveal } from "@/registry/default/ui/text-reveal"

export default function TextRevealDemo() {
  return (
    <figure className="max-w-md text-center">
      <blockquote>
        <TextReveal as="p" text="Simple things should be simple, complex things should be possible." className="text-3xl font-semibold tracking-tight text-balance" />
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">Alan Kay</figcaption>
    </figure>
  )
}
