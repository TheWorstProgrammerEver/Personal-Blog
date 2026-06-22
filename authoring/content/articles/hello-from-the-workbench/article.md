---
title: "Hello From The Workbench"
subtitle: "A tiny seed post for proving the content model."
created: 2026-06-22
updated: 2026-06-22
author: "Ryan Hayward"
tags:
  - meta
  - writing
status: published
---

This is the first article-shaped object in the system.

![A simple card-style workbench illustration.](./workbench-card.svg)

It is intentionally small: enough frontmatter to validate the content model,
enough Markdown to prove the authoring loop, and nothing that decides the final
site structure too early.

```ts
const postPath = (slug = "hello-from-the-workbench") =>
  `/posts/${slug}/`
```
