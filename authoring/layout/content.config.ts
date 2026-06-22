import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const articles = defineCollection({
  loader: glob({
    pattern: "*/article.md",
    base: "./authoring/content/articles",
    generateId: ({ entry }) => entry.replace(/\/article\.md$/, "")
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default("Ryan Hayward"),
    tags: z.array(z.string()).default([]),
    status: z.enum(["draft", "published", "archived"]).default("draft")
  })
})

export const collections = { articles }
