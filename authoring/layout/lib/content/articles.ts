import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;
export type ArticleStatus = Article["data"]["status"];

type ArticleQueryOptions = {
  includeDrafts?: boolean;
};

const descendingByCreated = (a: Article, b: Article) =>
  b.data.created.getTime() - a.data.created.getTime();

export const getArticleSlug = (article: Article) => article.id;

export const shouldIncludeDraftArticles = () =>
  import.meta.env.BLOG_INCLUDE_DRAFTS === "true" || !import.meta.env.PROD;

export async function getArticles(options: ArticleQueryOptions = {}) {
  const includeDrafts = options.includeDrafts ?? shouldIncludeDraftArticles();
  const articles = await getCollection("articles", ({ data }) => {
    return includeDrafts || data.status === "published";
  });

  return articles.sort(descendingByCreated);
}

export async function getPublishedArticles() {
  const articles = await getCollection("articles", ({ data }) => {
    return data.status === "published";
  });

  return articles.sort(descendingByCreated);
}

export async function getArticleBySlug(slug: string, options: ArticleQueryOptions = {}) {
  const articles = await getArticles(options);
  return articles.find((article) => getArticleSlug(article) === slug);
}

export async function getArticleTags(options: ArticleQueryOptions = {}) {
  const articles = await getArticles(options);
  const tags = new Set<string>();

  for (const article of articles) {
    for (const tag of article.data.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}
