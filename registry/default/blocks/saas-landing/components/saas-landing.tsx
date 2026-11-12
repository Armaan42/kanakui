import { Navbar01 } from "@/registry/default/blocks/navbar-01/components/navbar-01"
import { Hero01 } from "@/registry/default/blocks/hero-01/components/hero-01"
import { LogoCloud01 } from "@/registry/default/blocks/logo-cloud-01/components/logo-cloud-01"
import { Features01 } from "@/registry/default/blocks/features-01/components/features-01"
import { Features03 } from "@/registry/default/blocks/features-03/components/features-03"
import { Stats01 } from "@/registry/default/blocks/stats-01/components/stats-01"
import { Pricing01 } from "@/registry/default/blocks/pricing-01/components/pricing-01"
import { Testimonials01 } from "@/registry/default/blocks/testimonials-01/components/testimonials-01"
import { Faq01 } from "@/registry/default/blocks/faq-01/components/faq-01"
import { Cta01 } from "@/registry/default/blocks/cta-01/components/cta-01"
import { Footer01 } from "@/registry/default/blocks/footer-01/components/footer-01"

/**
 * SaaS Landing template: a full page assembled from kanakui blocks.
 * Each section is its own file in your project, so reorder, remove or edit
 * them freely. Render it from a page, e.g. `app/page.tsx`.
 */
export function SaasLanding() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar01 />
      <main className="flex-1">
        <Hero01 />
        <LogoCloud01 />
        <Features01 />
        <Features03 />
        <Stats01 />
        <Pricing01 />
        <Testimonials01 />
        <Faq01 />
        <Cta01 />
      </main>
      <Footer01 />
    </div>
  )
}
