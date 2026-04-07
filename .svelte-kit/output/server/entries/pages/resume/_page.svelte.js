import { h as head } from "../../../chunks/index2.js";
function _page($$renderer) {
  head("1mijfb4", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Resume — Leo</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Leo's resume."/>`);
  });
  $$renderer.push(`<div class="container"><header class="page-header svelte-1mijfb4"><h1 class="svelte-1mijfb4">Resume</h1> <p class="svelte-1mijfb4">Download or view my resume below.</p></header> <div class="resume-wrap svelte-1mijfb4"><div class="toolbar svelte-1mijfb4"><a href="/resume.pdf" download="" class="btn svelte-1mijfb4">download PDF</a> <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost svelte-1mijfb4">open in new tab</a></div> <div class="pdf-frame svelte-1mijfb4"><object data="/resume.pdf" type="application/pdf" width="100%" height="100%"><p class="fallback svelte-1mijfb4">Your browser can't display PDFs inline. <a href="/resume.pdf" download="" class="svelte-1mijfb4">Download the PDF</a> instead.</p></object></div></div></div>`);
}
export {
  _page as default
};
