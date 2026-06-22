import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import {
  getArticleUrl,
  getPublishedArticles
} from "../lib/content/articles"
import {
  siteDescription,
  siteLanguage,
  siteTitle
} from "../lib/site"

export const GET: APIRoute = async (context) =>
  rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site ?? context.url,
    customData: `<language>${siteLanguage}</language>`,
    items: (await getPublishedArticles())
      .map((article) => ({
        title: article.data.title,
        description: article.data.subtitle ?? siteDescription,
        pubDate: article.data.created,
        link: getArticleUrl(article),
        categories: article.data.tags
      }))
  })
