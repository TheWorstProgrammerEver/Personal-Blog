import { defineConfig } from "astro/config"

const localSiteUrl = "http://localhost:4321"

const trimTrailingSlash = (url) => url.replace(/\/$/, "")

const getSiteUrl = () =>
  trimTrailingSlash(process.env.BLOG_SITE_URL ?? process.env.URL ?? localSiteUrl)

export default defineConfig({
  site: getSiteUrl(),
  srcDir: "./authoring/layout",
  outDir: "./dist",
  build: {
    format: "directory"
  }
})
