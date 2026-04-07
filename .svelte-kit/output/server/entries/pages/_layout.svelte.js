import { g as getContext, e as ensure_array_like, b as attr, f as attr_class, a as escape_html, i as store_get, u as unsubscribe_stores, h as head } from "../../chunks/index2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
const favicon = "data:image/svg+xml,%3csvg%20id='emoji'%20viewBox='0%200%2072%2072'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='color'%3e%3cpath%20fill='%23f4aa41'%20d='M42.9778,61.958H27.1451A4.0845,4.0845,0,0,1,23.21,58.3763L19.0916,31.1494A1,1,0,0,1,20.08,30H50.0642a.9994.9994,0,0,1,.9883,1.15L46.8773,58.6067A3.9444,3.9444,0,0,1,42.9778,61.958Z'/%3e%3cpath%20fill='%23b399c8'%20d='M39.0727,32.0166,37.6941,47.1833a1,1,0,0,1-.9756.7851.5574.5574,0,0,1-.1564,0l-4.546-.0926a1.11,1.11,0,0,1-.7631-.4643.998.998,0,0,1-.1338-.7588L32.1,32.0166ZM33.822,25.3945l.2588-1.1523c1.336-5.9443,3.0879-8.4473,8.1514-11.6426l7.4844-4.77a.9983.9983,0,0,1,1.3721.293l2.6142,3.9687a.9987.9987,0,0,1-.293,1.39l-8.0156,5.1709A10.5358,10.5358,0,0,0,40.8,25.2373l-.043.195Z'/%3e%3cpath%20fill='%2392d3f5'%20d='M52.9021,32.0166H17.25a1,1,0,0,1-1-1V28.9033a3.513,3.513,0,0,1,3.5088-3.5088H50.3933a3.513,3.513,0,0,1,3.5088,3.5088v2.1133A.9994.9994,0,0,1,52.9021,32.0166Z'/%3e%3c/g%3e%3cg%20id='line'%3e%3cpath%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M49.55,34.1934,45.9024,58.3491A3.0671,3.0671,0,0,1,42.87,60.9583h-15.62A3.0672,3.0672,0,0,1,24.2164,58.35L20.5626,34.1934'/%3e%3ccircle%20cx='28.8063'%20cy='55.7315'%20r='2'/%3e%3ccircle%20cx='39.1173'%20cy='56.5657'%20r='2'/%3e%3ccircle%20cx='27.8773'%20cy='47.2169'%20r='2'/%3e%3ccircle%20cx='42.2668'%20cy='43.979'%20r='2'/%3e%3ccircle%20cx='25.8773'%20cy='41.0017'%20r='2'/%3e%3ccircle%20cx='34.4036'%20cy='52.0518'%20r='2'/%3e%3ccircle%20cx='42.2668'%20cy='50.4521'%20r='2'/%3e%3cpath%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M52.9022,28.9037a2.5163,2.5163,0,0,0-2.5089-2.5089H19.7587A2.5162,2.5162,0,0,0,17.25,28.9037v2.1127H52.9022Z'/%3e%3cpath%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M34.6406,26.3948l.76-3.3468c1.2233-4.62,2.9271-6.8011,7.3659-9.6029l7.4875-4.7737,2.614,3.9693-8.0154,5.1712a11.5951,11.5951,0,0,0-4.3971,5.2362l-.7969,3.3467'/%3e%3cline%20x1='38.3711'%20x2='42.0205'%20y1='16.9675'%20y2='20.3926'%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3cline%20x1='41.1451'%20x2='43.7301'%20y1='14.5306'%20y2='18.6355'%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3cline%20x1='36.3922'%20x2='40.8584'%20y1='20.109'%20y2='22.193'%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3cline%20x1='32.9397'%20x2='32.0967'%20y1='34.1934'%20y2='46.8749'%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3cline%20x1='37.8713'%20x2='36.7104'%20y1='34.1934'%20y2='46.9802'%20fill='none'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3c/g%3e%3c/svg%3e";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const links = [
      { href: "/about", label: "about" },
      { href: "/blog", label: "blog" },
      { href: "/projects", label: "projects" },
      { href: "/resume", label: "resume" },
      { href: "/now", label: "now" }
    ];
    function isActive(href) {
      const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
      return path === href || href !== "/" && path.startsWith(href + "/");
    }
    $$renderer2.push(`<header class="svelte-1h32yp1"><nav class="container svelte-1h32yp1"><a href="/" class="logo svelte-1h32yp1" aria-label="Home"><span class="dot svelte-1h32yp1" aria-hidden="true"></span> <span class="wordmark svelte-1h32yp1">leo<span class="accent svelte-1h32yp1">.</span></span></a> <ul role="list" class="svelte-1h32yp1"><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", link.href)}${attr_class("svelte-1h32yp1", void 0, { "active": isActive(link.href) })}>${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const socials = [
      {
        href: "https://github.com/brasilius",
        label: "github",
        rel: "me noopener noreferrer"
      },
      {
        href: "https://www.instagram.com/niels_leo_larsen/",
        label: "instagram",
        rel: "me noopener noreferrer"
      }
    ];
    $$renderer2.push(`<footer class="svelte-jz8lnl"><div class="container"><div class="h-card" hidden=""><a class="u-url u-uid" href="https://yoursite.com" rel="me">yoursite.com</a> <span class="p-name">Leo</span> <span class="p-note">A personal site on the IndieWeb.</span></div> <div class="inner svelte-jz8lnl"><div class="left svelte-jz8lnl"><span class="copy">© ${escape_html(year)} Leo</span> <span class="sep svelte-jz8lnl" aria-hidden="true">/</span> <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener" target="_blank" class="svelte-jz8lnl">Yipee!</a></div> <nav class="socials svelte-jz8lnl" aria-label="Social links"><!--[-->`);
    const each_array = ensure_array_like(socials);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let s = each_array[$$index];
      $$renderer2.push(`<a${attr("href", s.href)}${attr("rel", s.rel)} target="_blank" class="svelte-jz8lnl">${escape_html(s.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav></div> <div class="badges svelte-jz8lnl"><a class="badge svelte-jz8lnl" href="https://indieweb.org" rel="noopener" target="_blank">IndieWeb</a> <a class="badge svelte-jz8lnl" href="https://microformats.org" rel="noopener" target="_blank">microformats</a></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="icon"${attr("href", favicon)}/> <meta name="author" content="Leo"/>`);
  });
  Nav($$renderer);
  $$renderer.push(`<!----> <main>`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
