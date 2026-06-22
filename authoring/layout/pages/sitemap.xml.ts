import type { APIRoute } from "astro"
import {
  getArticleUrl,
  getPublishedArticles
} from "../lib/content/articles"
import { escapeXml, xmlResponse } from "../lib/xml"
import { getCanonicalUrl } from "../lib/site"

const getSitemapEntry = (url: string, lastModified?: Date) =>
  [
    "<url>",
    `<loc>${escapeXml(url)}</loc>`,
    lastModified ? `<lastmod>${lastModified.toISOString()}</lastmod>` : "",
    "</url>"
  ].join("")

const getSitemapEntries = async (baseUrl: string | URL) =>
  [
    getSitemapEntry(getCanonicalUrl("/", baseUrl).href),
    ...(await getPublishedArticles())
      .map((article) =>
        getSitemapEntry(
          getCanonicalUrl(getArticleUrl(article), baseUrl).href,
          article.data.updated ?? article.data.created
        )
      )
  ]

export const GET: APIRoute = async ({ site, url }) =>
  xmlResponse(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...(await getSitemapEntries(site ?? url)),
      "</urlset>"
    ].join("")
  )
