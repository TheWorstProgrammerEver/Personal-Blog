import { runAstro } from "./astro-command.mjs"

runAstro(["build"], {
  env: {
    BLOG_ENV: process.env.BLOG_ENV ?? "production",
    BLOG_INCLUDE_DRAFTS: process.env.BLOG_INCLUDE_DRAFTS ?? "false"
  }
})
