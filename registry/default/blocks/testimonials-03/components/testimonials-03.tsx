import { AvatarStack } from "@/registry/default/ui/avatar-stack"
import { Rating } from "@/registry/default/ui/rating"

// Placeholder quote and people. Replace with a real quote (with permission).
const others = ["Priya Raman", "Daniel Okafor", "Mei Tanaka", "Lena Fischer", "Omar Haddad", "Grace Kim", "Tomás Ruiz"].map((name) => ({ name }))

/** One large featured quote with a rating and a row of other customers. */
export function Testimonials03() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <figure className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <Rating label="Rating" value={5} readOnly />
        <blockquote className="mt-6 text-2xl font-medium tracking-tight text-balance sm:text-3xl">
          <p>“We shipped our new marketing site in four days. It looks better than the one that took us four months.”</p>
        </blockquote>
        <figcaption className="mt-8 text-sm">
          <span className="font-medium">Ananya Iyer</span>
          <span className="text-muted-foreground"> · Head of Growth, Northwind</span>
        </figcaption>
        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <AvatarStack people={others} max={5} size={32} />
          and teams like hers
        </div>
      </figure>
    </section>
  )
}
