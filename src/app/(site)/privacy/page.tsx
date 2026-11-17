import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "@/components/site/page-header"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `What ${siteConfig.name} collects, why, where it's stored and how to delete it.`,
}

// Keep this page in step with the code: if the site starts collecting
// anything new (analytics, emails, payments), update it in the same change.
const UPDATED = "November 18, 2026"

const h2 = "text-xl font-semibold tracking-tight"
const p = "text-sm leading-7 text-muted-foreground"
const list = "list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground marker:text-muted-foreground"
const link = "text-foreground underline underline-offset-4"

export default function PrivacyPage() {
  const name = siteConfig.name
  return (
    <article className="mx-auto w-full max-w-2xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow="Legal" title="Privacy Policy" description={`Last updated ${UPDATED}.`} />

      <section className="space-y-3">
        <h2 className={h2}>The short version</h2>
        <ul className={list}>
          <li>You can use everything on {name} without an account, and we don’t track you.</li>
          <li>If you sign in with Google, we store your name, email, profile photo and your favourites. That’s it.</li>
          <li>We don’t sell your data, show ads or use analytics.</li>
          <li>You can delete your account and everything in it at any time from your account page.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>Browsing without an account</h2>
        <p className={p}>
          We don’t use analytics, advertising or tracking cookies. Your browser remembers a few display preferences on
          your own device (light or dark mode, theme colors, your package manager, grid or list view); they never leave
          it. Our host keeps standard server logs, such as IP address and pages requested, to run and secure the site.
        </p>
        <p className={p}>
          Some component demos show photos loaded from Unsplash, so your browser contacts Unsplash’s image servers when
          you view them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>If you create an account</h2>
        <p className={p}>Accounts are optional and free. Signing in with Google gives us:</p>
        <ul className={list}>
          <li>your name, email address and profile photo from your Google account, and Google’s ID for you;</li>
          <li>the components, blocks and templates you save to your favourites, and when you saved them;</li>
          <li>a session cookie that keeps you signed in. It’s required for sign-in to work.</li>
        </ul>
        <p className={p}>
          We use this only to run your account: showing who’s signed in and keeping your favourites. We never receive
          your Google password.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>Who processes it</h2>
        <ul className={list}>
          <li>
            <strong className="font-medium text-foreground">Google</strong> handles signing in.
          </li>
          <li>
            <strong className="font-medium text-foreground">Supabase</strong> stores accounts and favourites, in the United
            States.
          </li>
          <li>
            <strong className="font-medium text-foreground">Vercel</strong> hosts the website.
          </li>
        </ul>
        <p className={p}>Each works under its own privacy policy. We share your data with no one else.</p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>Keeping and deleting your data</h2>
        <p className={p}>
          We keep your account until you delete it. On your{" "}
          <Link href="/account" className={link}>
            account page
          </Link>
          , <em>Delete account</em> removes your account and favourites immediately. Copies in our providers’ backups
          expire on their normal schedule. You can also remove {name}’s access from your Google account settings at any
          time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>Changes and contact</h2>
        <p className={p}>
          If this policy changes, we’ll update it here and change the date above. Questions or requests:{" "}
          <a href={`${siteConfig.links.github}/issues`} target="_blank" rel="noreferrer" className={link}>
            open an issue on GitHub
          </a>
          .
        </p>
      </section>
    </article>
  )
}
