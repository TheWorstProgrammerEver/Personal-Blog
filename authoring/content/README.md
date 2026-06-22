# Authoring Content

Article folders live under `articles/`:

```txt
articles/
  my-article-slug/
    article.md
    assets/
      image.svg
```

Use frontmatter in `article.md` for metadata. Article-local assets can be
referenced with normal relative Markdown paths:

```md
![Alt text](./assets/image.svg)
```

`status: draft` articles appear in local preview and stay out of the default
production build.
