import { Navbar01 } from "@/registry/default/blocks/navbar-01/components/navbar-01"
import { Hero08 } from "@/registry/default/blocks/hero-08/components/hero-08"
import { LogoCloud02 } from "@/registry/default/blocks/logo-cloud-02/components/logo-cloud-02"
import { Features03 } from "@/registry/default/blocks/features-03/components/features-03"
import { Stats01 } from "@/registry/default/blocks/stats-01/components/stats-01"
import { Team01 } from "@/registry/default/blocks/team-01/components/team-01"
import { Testimonials03 } from "@/registry/default/blocks/testimonials-03/components/testimonials-03"
import { Contact01 } from "@/registry/default/blocks/contact-01/components/contact-01"
import { Cta02 } from "@/registry/default/blocks/cta-02/components/cta-02"
import { Footer01 } from "@/registry/default/blocks/footer-01/components/footer-01"

/**
 * Agency template: a full page assembled from kanakui blocks.
 * Each section is its own file in your project, so reorder, remove or edit
 * them freely. Render it from a page, e.g. `app/page.tsx`.
 */
export function Agency() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar01 />
      <main className="flex-1">
        <Hero08 />
        <LogoCloud02 />
        <Features03 />
        <Stats01 />
        <Team01 />
        <Testimonials03 />
        <Contact01 />
        <Cta02 />
      </main>
      <Footer01 />
    </div>
  )
}
