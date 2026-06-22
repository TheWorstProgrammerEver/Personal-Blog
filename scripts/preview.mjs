import { runAstro } from "./astro-command.mjs"

runAstro(["dev", "--host", "127.0.0.1"], {
  env: {
    BLOG_ENV: "local-preview",
    BLOG_INCLUDE_DRAFTS: "true"
  }
})
