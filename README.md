# leo's site

A personal IndieWeb site built with [SvelteKit](https://kit.svelte.dev) and [mdsvex](https://mdsvex.pngwn.io).

Matcha-green palette, markdown-based posts, microformats2 markup (h-card, h-entry).

## Stack

- **Framework** — SvelteKit 2 + Svelte 5 (runes)
- **Markdown** — mdsvex (`.md` files compile to Svelte components)
- **Styling** — Custom CSS with design tokens in `src/app.css`
- **Fonts** — Inter (body) + IBM Plex Mono (code/accents) via Google Fonts

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, currently section, recent posts |
| `/blog` | Post index grouped by year |
| `/blog/[slug]` | Individual post |
| `/about` | About + h-card |
| `/now` | /now page |

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

The post is picked up automatically — no config changes needed.
Set `published: false` to keep a draft out of all listings.

## Development

```sh
npm install
npm run dev
```

Type-check:

```sh
npm run check
```

## Build

```sh
npm run build
npm run preview
```

Deploy by swapping `@sveltejs/adapter-auto` in `svelte.config.js` for the adapter that matches your host (Netlify, Vercel, Node, static, etc.).
