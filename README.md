# kanakui

A React component registry and marketplace. Components install with the
official shadcn CLI:

```bash
npx shadcn@latest add http://localhost:3000/r/animated-card.json
```

> `kanakui` / `@kanakui` is a placeholder name. Change it in `.env.local`
> (see `.env.example`). It is never hardcoded anywhere else.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn (Radix base, Nova preset) · Motion

Requires Node.js 22.18+ (scripts run TypeScript natively). Developed on Node 24.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Builds the registry, then starts the dev server on :3000 |
| `npm run build` | Builds the registry, then builds the site for production |
| `npm run registry:build` | Validates items, writes `registry.json`, runs `shadcn build` into `public/r`, verifies output |
| `npm run registry:test` | Installs **every** item into a fresh Next.js app and type-checks it (takes a few minutes) |
| `npm run typecheck` / `npm run lint` | Static checks |

## How the registry works

```text
registry/index.ts          item definitions (name, files, dependencies, version, …)
registry/default/ui/       component source  ─┐
registry/default/hooks/    hook source        ├─ shipped to users
registry/default/lib/      utility source    ─┘
        │
        │  scripts/registry.mts generate
        ▼
registry.json              official shadcn format (generated, git-ignored)
src/styles/registry.css    item CSS for the site's own previews (generated, committed)
        │
        │  shadcn build
        ▼
public/r/<name>.json       served at /r/<name>.json — what the CLI downloads
```

Before anything is written, the generator checks that:

- every npm package a file imports is listed in `dependencies`;
- every `@/registry/...` import points to a file in the same item or in one of its
  `internalDependencies`;
- no file imports a path that only exists in this project (anything under `@/` other than
  `@/lib/utils` and `@/registry/...`);
- names are unique kebab-case, versions are semver, release dates are valid and files exist;
- every category exists in `registry/categories.ts`;
- every component has a demo (`registry/default/examples/<name>-demo.tsx`) and an entry in
  `registry/docs.ts`;
- the final `registry.json` matches the official schema from `shadcn/schema`.

### Adding a component

1. Create `registry/default/ui/my-thing.tsx`. Import `cn` from `@/lib/utils` and other
   registry items from `@/registry/default/{ui,hooks,lib}/...`. The CLI rewrites these
   imports to the consumer's aliases.
2. Add an entry to `registry/index.ts` (with `releasedAt` and `categories`).
3. Add a demo at `registry/default/examples/my-thing-demo.tsx` that default-exports a
   component. It drives the live preview and the "Usage" code on the site.
4. Add props, requirements, customization, accessibility and troubleshooting notes to
   `registry/docs.ts`.
5. Run `npm run registry:build`, then `npm run registry:test`.

The component page (`/components/my-thing`), its full-screen preview (`/view/my-thing`),
category pages and the source shown in the Manual install tab are all generated from
these files. The Manual tab and Usage code show imports rewritten to the paths a user
gets after installing (`@/components/ui/...`, `@/hooks/...`, `@/lib/...`).

### Adding a block

Blocks are page sections (hero, pricing, footer…) with `type: "registry:block"`.

1. Put every file in `registry/default/blocks/<name>/components/` with
   `type: "registry:component"`. The CLI installs them to `@/components/<file>`, and imports
   between them (`@/registry/default/blocks/<name>/components/<file>`) are rewritten to
   `@/components/<file>`. Prefix file names with the block name (`pricing-01-plans.ts`) so
   they don't collide with the user's own components.
2. To use a shadcn component, import it from `@/components/ui/<name>` and list it in
   `registryDependencies` (e.g. `["button"]`). The build fails if you import one without
   declaring it. Avoid `asChild` and other Radix-only props, because Base UI projects get
   a different `button`.
3. Add a demo, docs and the registry entry as for components. Blocks appear under `/blocks`,
   with scaled thumbnails on the listing and a taller preview on their page.

`npm run registry:test` (Radix) and `TEST_BASE=base npm run registry:test` (Base UI) install
every component and block into a fresh app and type-check them.

### Why `registry/default/{ui,hooks,lib}`?

The shadcn CLI rewrites imports matching `@/registry/<style>/ui|hooks|lib|components/...`
to the consumer's aliases. Category folders would break imports between items, so
categories are stored as metadata (`categories`) instead.

### Why internal dependencies are URLs

Dependencies between our own items are written as absolute URLs
(`${NEXT_PUBLIC_SITE_URL}/r/<name>.json`), not `@kanakui/<name>`. Tested with
shadcn 4.23: a namespaced dependency makes a plain URL install fail with
`Unknown registry "@kanakui"` unless the user has configured the namespace.

## Installing (consumer side)

There are three ways, and all of them have been tested:

```bash
# 1. By URL, with no setup
npx shadcn@latest add https://YOUR_DOMAIN/r/animated-card.json

# 2. By namespace, after a one-time setup
npx shadcn@latest registry add @kanakui=https://YOUR_DOMAIN/r/{name}.json
npx shadcn@latest add @kanakui/animated-card

# 3. By namespace with zero setup. This only works once @kanakui is accepted into
#    shadcn's public registry index (a PR to shadcn-ui/ui, Phase 8).
```

## License

The free components in this registry are released under the [MIT License](LICENSE). Premium resources (later phases) will be distributed under separate commercial terms and will not be stored in this repository.

