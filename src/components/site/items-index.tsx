import { CategoryNav } from "@/components/site/category-nav"
import { ItemsBrowser } from "@/components/site/items-browser"
import { PageHeader } from "@/components/site/page-header"
import { getCategories, getItems, getItemsByCategory, type CategoryWithCount, type ItemKind } from "@/lib/registry"

const INTRO: Record<ItemKind, { title: string; description: (count: number) => string }> = {
  components: {
    title: "Components",
    description: (n) =>
      `${n} ${n === 1 ? "component" : "components"} you can add to your project with one command. The source code is copied into your project for you to change.`,
  },
  blocks: {
    title: "Blocks",
    description: (n) =>
      `${n} ready-made page ${n === 1 ? "section" : "sections"} (heroes, pricing, footers and more). Each installs with one command and is built from components you can edit.`,
  },
}

/** Index (/<kind>) or category (/<kind>/category/<slug>) listing. */
export function ItemsIndex({ kind, category }: { kind: ItemKind; category?: CategoryWithCount }) {
  const all = getItems(kind)
  const items = category ? getItemsByCategory(kind, category.slug) : all

  return (
    <div className="page-container space-y-8 py-10 sm:py-14">
      <PageHeader
        title={category ? category.title : INTRO[kind].title}
        description={category ? category.description : INTRO[kind].description(all.length)}
      />
      <CategoryNav kind={kind} categories={getCategories(kind)} total={all.length} active={category?.slug} />
      <ItemsBrowser items={items} kind={kind} />
    </div>
  )
}
