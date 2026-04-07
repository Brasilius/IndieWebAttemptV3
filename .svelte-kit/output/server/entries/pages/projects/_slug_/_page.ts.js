import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../projects/example-project.md": () => import("../../../../chunks/example-project.js").then((n) => n._) }), `../../../projects/${params.slug}.md`, 5);
    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch {
    throw error(404, `Project "${params.slug}" not found`);
  }
};
export {
  load
};
