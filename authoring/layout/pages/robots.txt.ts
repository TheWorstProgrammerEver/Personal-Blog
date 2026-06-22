import type { APIRoute } from "astro"
import {
  getCanonicalUrl,
  sitemapPath
} from "../lib/site"

export const GET: APIRoute = ({ site, url }) =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      `Sitemap: ${getCanonicalUrl(sitemapPath, site ?? url).href}`,
      ""
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  )
