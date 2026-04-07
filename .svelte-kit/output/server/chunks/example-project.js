import "clsx";
const metadata = {
  "title": "IndieWeb Personal Site",
  "description": "A personal website built with SvelteKit and mdsvex, styled with a custom earthy matcha palette. Features a blog, projects page, and IndieWeb microformats.",
  "tags": ["sveltekit", "typescript", "indieweb", "css"],
  "image": "pfpbanner1.jpg",
  "imageAlt": "Leo's profile picture",
  "link": "https://github.com/Brasilius/IndieWebAttemptV3",
  "date": "2026-04-06"
};
const { title, description, tags, image, imageAlt, link, date } = metadata;
function Example_project_md($$renderer) {
  $$renderer.push(`<h2>Overview</h2> <p>A personal site built on the IndieWeb principles — own your data, own your content.</p> <h2>Stack</h2> <ul><li><strong>Framework:</strong> SvelteKit</li> <li><strong>Content:</strong> mdsvex (Markdown + Svelte)</li> <li><strong>Styling:</strong> Custom CSS variables with a matcha green palette</li></ul> <h2>Features</h2> <ul><li>File-based routing with TypeScript</li> <li>Markdown blog posts with frontmatter metadata</li> <li>h-card and h-entry microformat markup</li> <li>Responsive design with a sticky nav</li></ul>`);
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Example_project_md,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_0 as _
};
