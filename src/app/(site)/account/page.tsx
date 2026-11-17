import type { Metadata } from "next"

import { AccountView, type AccountItem } from "@/components/site/account/account-view"
import { PageHeader } from "@/components/site/page-header"
import { getItems, KIND_LABEL, type ItemKind } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Your account",
  description: "Your profile and favourites.",
  robots: { index: false },
}

const KINDS: ItemKind[] = ["components", "blocks", "templates"]

/**
 * Signed-out visitors never get here: proxy.ts sends them to /sign-in. The
 * page itself is static; the account and favourites load in the browser,
 * where Row Level Security only returns this user's rows.
 */
export default function AccountPage() {
  const items: AccountItem[] = KINDS.flatMap((kind) =>
    getItems(kind).map((item) => ({ name: item.name, title: item.title, href: item.href, kind: KIND_LABEL[kind].plural }))
  )
  return (
    <div className="mx-auto w-full max-w-2xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow="Account" title="Your account" description="Your profile and the things you’ve saved." />
      <AccountView items={items} />
    </div>
  )
}
