# leo's site

A personal IndieWeb site built with [SvelteKit](https://kit.svelte.dev) and [mdsvex](https://mdsvex.pngwn.io).

Matcha-green palette, markdown-based posts and projects, microformats2 markup (h-card, h-entry).

## Stack

- **Framework** — SvelteKit 2 + Svelte 5 (runes)
- **Markdown** — mdsvex (`.md` files compile to Svelte components, smartypants enabled)
- **Styling** — Custom CSS with design tokens in `src/app.css`
- **Fonts** — Inter (body) + IBM Plex Mono (code/accents) via Google Fonts
- **Analytics** — Vercel Web Analytics + Speed Insights (`@vercel/analytics`, `@vercel/speed-insights`)
- **PDF rendering** — pdfjs-dist (resume page)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, currently section, recent posts |
| `/blog` | Post index |
| `/blog/[slug]` | Individual post |
| `/projects` | Projects index |
| `/projects/[slug]` | Individual project |
| `/about` | About + h-card |
| `/now` | /now page |
| `/resume` | Resume |
| `/search` | Full-text search across posts |

## Adding a post

Drop a `.md` file into `src/posts/` with this frontmatter:

```yaml
---
title: My Post Title
date: '2026-04-10'
description: One-line summary shown in cards and meta tags.
tags: [tag1, tag2]
published: true
---

Post content here...
```

Set `published: false` to keep a draft out of all listings.

## Adding a project

Drop a `.md` file into `src/projects/` with this frontmatter:

```yaml
---
title: My Project
description: One-line summary.
tags: [tag1, tag2]
image: filename.jpg        # optional, must be in src/lib/assets/
imageAlt: Alt text
link: https://example.com  # optional
date: '2026-04-10'
---

Project details here...
```

Images referenced by filename are picked up from `src/lib/assets/` automatically.

## Development

```sh
npm install
npm run dev
```

Type-check:

```sh
npm run check
```

## OG Image

The static OG image (`static/og-image.png`) is generated via ImageMagick:

```sh
npm run generate-og
```

Requires ImageMagick (`magick` / `convert`) to be installed. The script lives in `scripts/generate-og.mjs` and produces a 1200×630 PNG for Open Graph / iMessage previews.

## Build & Deploy

```sh
npm run build
npm run preview
```

The project uses `@sveltejs/adapter-auto` and is deployed on Vercel. To deploy elsewhere, swap the adapter in `svelte.config.js` for the one matching your host (Netlify, Node, static, etc.).

## Docker

A multi-stage `Dockerfile` is included for containerised deployments:

```sh
docker build -t indieweb .
docker run -p 3000:3000 indieweb
```

The build stage compiles the app; the runtime stage copies only the `build/` output and production dependencies, keeping the image lean.
