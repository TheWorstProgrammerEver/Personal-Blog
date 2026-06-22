export const siteTitle = "Ryan Hayward's Blog"
export const siteDescription = "Writing by Ryan Hayward."
export const siteLanguage = "en-AU"
export const siteLocale = "en_AU"
export const rssFeedPath = "/rss.xml"
export const sitemapPath = "/sitemap.xml"

export const getPageTitle = (pageTitle = "") =>
  pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle

const isAbsoluteUrl = (path = "/") => /^https?:\/\//.test(path)

const getUrlPath = (path = "/") =>
  isAbsoluteUrl(path) || path.startsWith("/") ? path : `/${path}`

export const getCanonicalUrl = (
  path = "/",
  site: string | URL
) =>
  new URL(getUrlPath(path), site)
