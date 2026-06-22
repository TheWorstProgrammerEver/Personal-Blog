export const siteTitle = "Ryan Hayward's Blog"

export const getPageTitle = (pageTitle = "") =>
  pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
