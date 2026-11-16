import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    // Nothing is disallowed. The /view/<name> preview frames keep out of search
    // results with their own `noindex`, which crawlers can only read if allowed in;
    // blocking them would also stop the embedded previews from rendering for crawlers.
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  }
}
