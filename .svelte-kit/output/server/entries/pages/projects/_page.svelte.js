import { h as head, e as ensure_array_like, b as attr, c as stringify, a as escape_html } from "../../../chunks/index2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("rqn88j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Projects — Leo</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Things I've built and am currently building."/>`);
    });
    $$renderer2.push(`<div class="container"><header class="page-header svelte-rqn88j"><h1 class="svelte-rqn88j">Projects</h1> <p class="svelte-rqn88j">Things I've built and am currently building.</p></header> `);
    if (data.projects.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty svelte-rqn88j">Nothing here yet.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<ul class="project-grid svelte-rqn88j" role="list"><!--[-->`);
      const each_array = ensure_array_like(data.projects);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let project = each_array[$$index_1];
        $$renderer2.push(`<li class="project-card svelte-rqn88j"><a${attr("href", `/projects/${stringify(project.slug)}`)} class="card-link-overlay svelte-rqn88j"${attr("aria-label", project.title)}>`);
        if (project.image) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="card-image svelte-rqn88j"><img${attr("src", project.image)}${attr("alt", project.imageAlt ?? project.title)} class="svelte-rqn88j"/></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="card-body svelte-rqn88j"><div class="card-meta svelte-rqn88j">`);
        if (project.tags?.length) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="tags svelte-rqn88j"><!--[-->`);
          const each_array_1 = ensure_array_like(project.tags);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let tag = each_array_1[$$index];
            $$renderer2.push(`<span class="tag svelte-rqn88j">${escape_html(tag)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <h2 class="card-title svelte-rqn88j">${escape_html(project.title)}</h2> <p class="card-desc svelte-rqn88j">${escape_html(project.description)}</p> <span class="card-link svelte-rqn88j">read more →</span></div></a></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
