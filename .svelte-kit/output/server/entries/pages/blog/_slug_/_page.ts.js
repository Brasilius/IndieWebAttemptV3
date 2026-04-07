import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../posts/bell_internship.md": () => import("../../../../chunks/bell_internship.js").then((n) => n._), "../../../posts/tools-i-use.md": () => import("../../../../chunks/tools-i-use.js").then((n) => n._) }), `../../../posts/${params.slug}.md`, 5);
    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch {
    throw error(404, `Post "${params.slug}" not found`);
  }
};
export {
  load
};
