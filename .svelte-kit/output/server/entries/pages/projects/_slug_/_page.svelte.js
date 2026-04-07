import { h as head, b as attr, a as escape_html, e as ensure_array_like, d as derived } from "../../../../chunks/index2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const ProjectContent = derived(() => data.content);
    function formatDate(d) {
      return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    head("gygcht", $$renderer2, ($$renderer3) => {
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
    $$renderer2.push(`<div class="container"><a href="/projects" class="back-link svelte-gygcht">← all projects</a> <article><header class="post-header svelte-gygcht"><div class="post-meta svelte-gygcht"><time${attr("datetime", data.metadata.date)} class="svelte-gygcht">${escape_html(formatDate(data.metadata.date))}</time> `);
    if (data.metadata.tags?.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tags svelte-gygcht"><!--[-->`);
      const each_array = ensure_array_like(data.metadata.tags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<span class="tag svelte-gygcht">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <h1 class="svelte-gygcht">${escape_html(data.metadata.title)}</h1> `);
    if (data.metadata.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="description svelte-gygcht">${escape_html(data.metadata.description)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.metadata.link) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", data.metadata.link)} class="project-link svelte-gygcht" target="_blank" rel="noopener noreferrer">view project →</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> <div class="prose">`);
    if (ProjectContent()) {
      $$renderer2.push("<!--[-->");
      ProjectContent()($$renderer2, {});
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div> <footer class="post-footer svelte-gygcht"><hr/> <div class="post-nav svelte-gygcht"><a href="/projects" class="back-link svelte-gygcht">← back to projects</a> <a href="#top" class="to-top svelte-gygcht">↑ top</a></div></footer></article></div>`);
  });
}
export {
  _page as default
};
