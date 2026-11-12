import { Navbar02 } from "@/registry/default/blocks/navbar-02/components/navbar-02"
import { Hero05 } from "@/registry/default/blocks/hero-05/components/hero-05"
import { Features07 } from "@/registry/default/blocks/features-07/components/features-07"
import { Features05 } from "@/registry/default/blocks/features-05/components/features-05"
import { Stats02 } from "@/registry/default/blocks/stats-02/components/stats-02"
import { Changelog01 } from "@/registry/default/blocks/changelog-01/components/changelog-01"
import { Testimonials03 } from "@/registry/default/blocks/testimonials-03/components/testimonials-03"
import { Pricing01 } from "@/registry/default/blocks/pricing-01/components/pricing-01"
import { Cta04 } from "@/registry/default/blocks/cta-04/components/cta-04"
import { Footer02 } from "@/registry/default/blocks/footer-02/components/footer-02"

/**
 * Product Launch template: a full page assembled from kanakui blocks.
 * Each section is its own file in your project, so reorder, remove or edit
 * them freely. Render it from a page, e.g. `app/page.tsx`.
 */
export function ProductLaunch() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar02 />
      <main className="flex-1">
        <Hero05 />
        <Features07 />
        <Features05 />
        <Stats02 />
        <Changelog01 />
        <Testimonials03 />
        <Pricing01 />
        <Cta04 />
      </main>
      <Footer02 />
    </div>
  )
}
