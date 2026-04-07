import { b as attr, c as stringify, a as escape_html, e as ensure_array_like, h as head } from "../../chunks/index2.js";
function PostCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { post } = $$props;
    function formatDate(d) {
      return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    $$renderer2.push(`<article class="svelte-podw4w"><a${attr("href", `/blog/${stringify(post.slug)}`)} class="card svelte-podw4w"><div class="meta svelte-podw4w"><time${attr("datetime", post.date)} class="svelte-podw4w">${escape_html(formatDate(post.date))}</time> `);
    if (post.tags?.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tags svelte-podw4w" aria-label="Tags"><!--[-->`);
      const each_array = ensure_array_like(post.tags.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<span class="tag">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <h2 class="svelte-podw4w">${escape_html(post.title)}</h2> `);
    if (post.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="desc svelte-podw4w">${escape_html(post.description)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <span class="cta svelte-podw4w" aria-hidden="true">read →</span></a></article>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Leo — making things fly!</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Personal site and digital garden."/>`);
    });
    $$renderer2.push(`<div class="container"><section class="hero h-card svelte-1uha8ag"><div class="greeting svelte-1uha8ag"><span class="hello svelte-1uha8ag">"Rocky and Grace Save Stars!"</span></div> <h1 class="svelte-1uha8ag">I'm <a class="p-name u-url svelte-1uha8ag" href="/" rel="me">Niels Leo Larsen 🚀</a>.</h1> <p class="bio p-note svelte-1uha8ag">Aerospace Engineer by trade, Computer Enthusiast by passion. I work across the stack, from embedded systems to finite element analysis and computational fluid dynamics and even astrodynamics!</p> <div class="links svelte-1uha8ag"><a href="/about" class="svelte-1uha8ag">more about me</a> <span class="sep svelte-1uha8ag" aria-hidden="true">·</span> <a href="https://github.com/brasilius" rel="me noopener" target="_blank" class="svelte-1uha8ag">github</a> <span class="sep svelte-1uha8ag" aria-hidden="true">·</span> <a href="https://www.instagram.com/niels_leo_larsen/" rel="me noopener" target="_blank" class="svelte-1uha8ag">instagram</a></div></section> <hr class="svelte-1uha8ag"/> <section class="currently svelte-1uha8ag"><h2 class="section-label svelte-1uha8ag"><span class="dot svelte-1uha8ag" aria-hidden="true"></span> currently</h2> <ul class="svelte-1uha8ag"><li class="svelte-1uha8ag"><span class="key svelte-1uha8ag">reading</span> <span class="val svelte-1uha8ag">Project Hail Mary — Andy Weir</span></li> <li class="svelte-1uha8ag"><span class="key svelte-1uha8ag">building</span> <span class="val svelte-1uha8ag">a new payload 😭</span></li> <li class="svelte-1uha8ag"><span class="key svelte-1uha8ag">learning</span> <span class="val svelte-1uha8ag">about Paul Atreides</span></li></ul> <a href="/now" class="now-link svelte-1uha8ag">full /now page →</a></section> <hr class="svelte-1uha8ag"/> <section class="recent-posts svelte-1uha8ag"><div class="section-header svelte-1uha8ag"><h2 class="section-label svelte-1uha8ag"><span class="dot svelte-1uha8ag" aria-hidden="true"></span> recent writing</h2> <a href="/blog" class="see-all svelte-1uha8ag">all posts →</a></div> `);
    if (data.posts.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="post-grid svelte-1uha8ag"><!--[-->`);
      const each_array = ensure_array_like(data.posts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
        PostCard($$renderer2, { post });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty svelte-1uha8ag">Nothing yet — coming soon.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
