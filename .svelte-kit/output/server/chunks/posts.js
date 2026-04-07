import { _ as __vite_glob_0_0 } from "./bell_internship.js";
import { _ as __vite_glob_0_1 } from "./tools-i-use.js";
async function getPosts() {
  const modules = /* @__PURE__ */ Object.assign({ "/src/posts/bell_internship.md": __vite_glob_0_0, "/src/posts/tools-i-use.md": __vite_glob_0_1 });
  const posts = [];
  for (const [path, mod] of Object.entries(modules)) {
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";
    const metadata = mod.metadata;
    if (metadata && metadata.published !== false) {
      posts.push({ slug, ...metadata });
    }
  }
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
export {
  getPosts as g
};
