import { Navbar01 } from "@/registry/default/blocks/navbar-01/components/navbar-01"
import { Hero02 } from "@/registry/default/blocks/hero-02/components/hero-02"
import { LogoCloud01 } from "@/registry/default/blocks/logo-cloud-01/components/logo-cloud-01"
import { Features04 } from "@/registry/default/blocks/features-04/components/features-04"
import { Features02 } from "@/registry/default/blocks/features-02/components/features-02"
import { Pricing02 } from "@/registry/default/blocks/pricing-02/components/pricing-02"
import { Testimonials01 } from "@/registry/default/blocks/testimonials-01/components/testimonials-01"
import { Faq01 } from "@/registry/default/blocks/faq-01/components/faq-01"
import { Cta03 } from "@/registry/default/blocks/cta-03/components/cta-03"
import { Footer02 } from "@/registry/default/blocks/footer-02/components/footer-02"

/**
 * Developer Tool template: a full page assembled from kanakui blocks.
 * Each section is its own file in your project, so reorder, remove or edit
 * them freely. Render it from a page, e.g. `app/page.tsx`.
 */
export function DeveloperTool() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar01 />
      <main className="flex-1">
        <Hero02 />
        <LogoCloud01 />
        <Features04 />
        <Features02 />
        <Pricing02 />
        <Testimonials01 />
        <Faq01 />
        <Cta03 />
      </main>
      <Footer02 />
    </div>
  )
}
