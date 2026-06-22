import { getCollection } from "astro:content"
import type { CollectionEntry } from "astro:content"

export type Article = CollectionEntry<"articles">

type ArticleQueryOptions = {
  includeDrafts?: boolean
}

const descendingByCreated = (a: Article, b: Article) =>
  b.data.created.getTime() - a.data.created.getTime()

const sortArticles = (articles: Article[]) =>
  [...articles]
    .sort(descendingByCreated)

export const isDraftArticle = (article: Article) => article.data.status === "draft"

export const isPublishedArticle = (article: Article) => article.data.status === "published"

export const getArticleSlug = (article: Article) => article.id

export const getArticleUrl = (article: Article) => `/writing/${getArticleSlug(article)}/`

export const shouldIncludeDraftArticles = () =>
  import.meta.env.BLOG_INCLUDE_DRAFTS === "true" || !import.meta.env.PROD

export const getArticles = async (
  { includeDrafts = shouldIncludeDraftArticles() }: ArticleQueryOptions = {}
) =>
  sortArticles(
    await getCollection(
      "articles",
      (article) => includeDrafts || isPublishedArticle(article)
    )
  )

export const getPublishedArticles = () => getArticles({ includeDrafts: false })

export const getDraftArticles = async () =>
  sortArticles(
    (await getCollection("articles"))
      .filter(isDraftArticle)
  )

export const getArticleBySlug = async (
  slug: string,
  options: ArticleQueryOptions = {}
) =>
  (await getArticles(options))
    .find((article) => getArticleSlug(article) === slug)

export const getArticleTags = async (options: ArticleQueryOptions = {}) =>
  [...new Set(
    (await getArticles(options))
      .flatMap(({ data }) => data.tags)
  )]
    .sort((a, b) => a.localeCompare(b))
