import { HomeBlocks } from "@/components/home/home-blocks"
import { HomeCategories } from "@/components/home/home-categories"
import { HomeCta } from "@/components/home/home-cta"
import { HomeFaq } from "@/components/home/home-faq"
import { HomeHero } from "@/components/home/home-hero"
import { HomeHowItWorks } from "@/components/home/home-how-it-works"
import { HomePlayground } from "@/components/home/home-playground"
import { HomeShowcase } from "@/components/home/home-showcase"
import { getItems, getItemsByCategory } from "@/lib/registry"

export default function HomePage() {
  const components = getItems("components").length
  const blocks = getItems("blocks").length
  const threeD = getItemsByCategory("components", "3d").length

  return (
    <>
      <HomeHero components={components} blocks={blocks} threeD={threeD} />
      <HomeBlocks />
      <HomeShowcase />
      <HomePlayground />
      <HomeCategories />
      <HomeHowItWorks />
      <HomeFaq />
      <HomeCta />
    </>
  )
}
