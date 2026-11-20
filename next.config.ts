import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Components renamed to drop third-party trademarks. Old pages, previews and
  // install URLs (`npx shadcn add @venusui/<old>`) keep working.
  async redirects() {
    const renamed: [string, string][] = [
      ["rolodex", "card-file"],
      ["polaroid-stack", "photo-stack"],
      ["dynamic-island", "morphing-pill"],
      ["plinko-board", "galton-board"],
      ["lava-lamp", "motion-lamp"],
      ["t9-keypad", "multitap-keypad"],
    ];
    return renamed.flatMap(([from, to]) => [
      { source: `/components/${from}`, destination: `/components/${to}`, permanent: true },
      { source: `/view/${from}`, destination: `/view/${to}`, permanent: true },
      { source: `/r/${from}.json`, destination: `/r/${to}.json`, permanent: true },
    ]);
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
