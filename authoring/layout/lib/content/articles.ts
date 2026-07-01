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

let articleCollection: Promise<Article[]> | undefined

const getArticleCollection = () =>
  articleCollection ??= getCollection("articles")

export const isDraftArticle = (article: Article) => article.data.status === "draft"

export const isPublishedArticle = (article: Article) => article.data.status === "published"

export const isArchivedArticle = (article: Article) => article.data.status === "archived"

export const isPublicArticle = (article: Article) =>
  isPublishedArticle(article) || isArchivedArticle(article)

export const getArticleSlug = (article: Article) => article.id

export const getArticleUrl = (article: Article) => `/posts/${getArticleSlug(article)}/`

export const getTagSlug = (tag: string) =>
  tag
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const getTagUrl = (tag: string) => `/tags/${getTagSlug(tag)}/`

export const shouldIncludeDraftArticles = () =>
  import.meta.env.BLOG_INCLUDE_DRAFTS === "true" || !import.meta.env.PROD

const getArticlesMatching = async (
  predicate: (article: Article) => boolean
) =>
  sortArticles(
    (await getArticleCollection())
      .filter(predicate)
  )

export const getVisibleArticles = (
  { includeDrafts = shouldIncludeDraftArticles() }: ArticleQueryOptions = {}
) =>
  getArticlesMatching((article) => includeDrafts || isPublicArticle(article))

export const getRoutableArticles = getVisibleArticles

export const getListedArticles = (
  { includeDrafts = shouldIncludeDraftArticles() }: ArticleQueryOptions = {}
) =>
  getArticlesMatching(
    (article) => isPublishedArticle(article) || (includeDrafts && isDraftArticle(article))
  )

export const getSearchableArticles = getVisibleArticles

export const getArticles = getVisibleArticles

export const getPublishedArticles = () => getArticlesMatching(isPublishedArticle)

export const getDraftArticles = () =>
  getArticlesMatching(isDraftArticle)

export const getArchivedArticles = () =>
  getArticlesMatching(isArchivedArticle)

export const getArticleBySlug = async (
  slug: string,
  options: ArticleQueryOptions = {}
) =>
  (await getRoutableArticles(options))
    .find((article) => getArticleSlug(article) === slug)

export const getArticleTags = async (options: ArticleQueryOptions = {}) =>
  (await getArticleTagSummaries(options))
    .map(({ name }) => name)

export const getArticleTagSummaries = async (
  options: ArticleQueryOptions = {}
) =>
  [...(await getSearchableArticles(options))
    .flatMap(({ data }) => data.tags)
    .reduce(
      (counts, tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1),
      new Map<string, number>()
    )]
    .map(([name, count]) => ({
      count,
      name,
      slug: getTagSlug(name),
      url: getTagUrl(name)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

export const getArticlesByTag = async (
  tag: string,
  options: ArticleQueryOptions = {}
) =>
  (await getSearchableArticles(options))
    .filter((article) => article.data.tags.includes(tag))

export const getSearchIndexEntries = async (options: ArticleQueryOptions = {}) =>
  (await getSearchableArticles(options))
    .map((article) => ({
      author: article.data.author,
      created: article.data.created.toISOString(),
      status: article.data.status,
      subtitle: article.data.subtitle ?? "",
      tags: article.data.tags,
      title: article.data.title,
      updated: article.data.updated?.toISOString() ?? "",
      url: getArticleUrl(article)
    }))
