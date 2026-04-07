import { h as head, b as attr, a as escape_html, e as ensure_array_like, d as derived } from "../../../../chunks/index2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const PostContent = derived(() => data.content);
    function formatDate(d) {
      return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    head("1teoznn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.metadata.title)} — Leo</title>`);
      });
      if (data.metadata.description) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="description"${attr("content", data.metadata.description)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`<div class="container"><a href="/blog" class="back-link svelte-1teoznn">← all posts</a> <article class="h-entry"><header class="post-header svelte-1teoznn"><div class="post-meta svelte-1teoznn"><time class="dt-published svelte-1teoznn"${attr("datetime", data.metadata.date)}>${escape_html(formatDate(data.metadata.date))}</time> `);
    if (data.metadata.tags?.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tags svelte-1teoznn"><!--[-->`);
      const each_array = ensure_array_like(data.metadata.tags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<span class="tag p-category">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <h1 class="p-name svelte-1teoznn">${escape_html(data.metadata.title)}</h1> `);
    if (data.metadata.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="description p-summary svelte-1teoznn">${escape_html(data.metadata.description)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> <div class="prose e-content">`);
    if (PostContent()) {
      $$renderer2.push("<!--[-->");
      PostContent()($$renderer2, {});
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div> <footer class="post-footer svelte-1teoznn"><hr/> <div class="post-nav svelte-1teoznn"><a href="/blog" class="back-link svelte-1teoznn">← back to writing</a> <a href="#top" class="to-top svelte-1teoznn">↑ top</a></div></footer></article></div>`);
  });
}
export {
  _page as default
};
