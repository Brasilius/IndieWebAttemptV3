import { h as head, b as attr, e as ensure_array_like, a as escape_html } from "../../../chunks/index2.js";
const pfpbanner = "/_app/immutable/assets/pfpbanner1.pNL9pB8O.jpg";
function _page($$renderer) {
  const links = [
    {
      href: "https://github.com/brasilius",
      label: "/github",
      rel: "me noopener noreferrer"
    },
    {
      href: "https://www.instagram.com/niels_leo_larsen/",
      label: "/instagram",
      rel: "me noopener noreferrer"
    },
    {
      href: "mailto:leonardolarsen9605@outlook.com",
      label: "/email",
      rel: ""
    }
  ];
  head("cwls5q", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>About - Leo</title>`);
    });
    $$renderer2.push(`<meta name="description" content="A bit about me."/>`);
  });
  $$renderer.push(`<div class="container"><div class="layout svelte-cwls5q"><aside class="sidebar"><div class="avatar-wrap h-card svelte-cwls5q"><img class="avatar u-photo svelte-cwls5q"${attr("src", pfpbanner)} alt="Leo"/> <p class="p-name name svelte-cwls5q">Leo</p> <p class="p-note tagline svelte-cwls5q">making things fly!</p> <a class="u-url u-uid" href="https://yoursite.com" rel="me" hidden="">yoursite.com</a> <ul class="social-links svelte-cwls5q" role="list"><!--[-->`);
  const each_array = ensure_array_like(links);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<li><a${attr("href", link.href)}${attr("rel", link.rel)}${attr("target", link.href.startsWith("http") ? "_blank" : void 0)} class="svelte-cwls5q">${escape_html(link.label)}</a></li>`);
  }
  $$renderer.push(`<!--]--></ul></div></aside> <div class="bio svelte-cwls5q"><h1 class="svelte-cwls5q">About</h1> <div class="prose"><p>Hi - I'm Leo. I'm a Swedish Brazilian aerospace engineer working out of Dallas, Texas. 
					I have a passion for building systems that work together!</p> <p>I use this website to talk about things that are ACTUALLY cool. For instance, Capybaras, those are pretty cool. Real talk though I like to write about 
					tech that I use to solve real problems, as well as the journey it took to solve those problems.</p> <h2>What I'm into</h2> <ul><li>Building small, focused software tools</li> <li>The IndieWeb and personal web publishing</li> <li>Mechanical keyboards and analog writing</li> <li>Science fiction - especially sci-fi like "The Expanse"</li></ul> <h2>This site</h2> <p>Built with <a href="https://kit.svelte.dev" rel="noopener" target="_blank">SvelteKit</a> and <a href="https://mdsvex.pngwn.io" rel="noopener" target="_blank">mdsvex</a>.
					Styled with custom CSS and a palette of earthy matcha greens 🍵.
					Posts are written in Markdown.
					Source is on <a href="https://github.com/Brasilius/IndieWebAttemptV3" rel="noopener" target="_blank">GitHub</a>.</p></div></div></div></div>`);
}
export {
  _page as default
};
