import { h as head, e as ensure_array_like, a as escape_html, b as attr, c as stringify, d as derived } from "../../../chunks/index2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    function formatDate(d) {
      return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    const postsByYear = derived(() => data.posts.reduce(
      (acc, post) => {
        const year = new Date(post.date).getFullYear().toString();
        (acc[year] ??= []).push(post);
        return acc;
      },
      {}
    ));
    const years = derived(() => Object.keys(postsByYear()).sort((a, b) => Number(b) - Number(a)));
    head("u4k2t", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Blog — Leo</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Writing on building, making, and living on the internet."/>`);
    });
    $$renderer2.push(`<div class="container"><header class="page-header svelte-u4k2t"><h1 class="svelte-u4k2t">Writing</h1> <p class="svelte-u4k2t">Many, many, thoughts.</p></header> `);
    if (data.posts.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty svelte-u4k2t">Nothing published yet.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(years());
      for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
        let year = each_array[$$index_2];
        $$renderer2.push(`<section class="year-group svelte-u4k2t"><h2 class="year-label svelte-u4k2t">${escape_html(year)}</h2> <ul role="list" class="post-list svelte-u4k2t"><!--[-->`);
        const each_array_1 = ensure_array_like(postsByYear()[year]);
        for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
          let post = each_array_1[$$index_1];
          $$renderer2.push(`<li><a${attr("href", `/blog/${stringify(post.slug)}`)} class="post-row svelte-u4k2t"><span class="title svelte-u4k2t">${escape_html(post.title)}</span> <span class="spacer svelte-u4k2t" aria-hidden="true"></span> <time${attr("datetime", post.date)} class="svelte-u4k2t">${escape_html(formatDate(post.date))}</time></a> `);
          if (post.tags?.length) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<div class="tags svelte-u4k2t"><!--[-->`);
            const each_array_2 = ensure_array_like(post.tags);
            for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
              let tag = each_array_2[$$index];
              $$renderer2.push(`<span class="tag">${escape_html(tag)}</span>`);
            }
            $$renderer2.push(`<!--]--></div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></li>`);
        }
        $$renderer2.push(`<!--]--></ul></section>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
