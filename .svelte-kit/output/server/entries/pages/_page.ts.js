import { g as getPosts } from "../../chunks/posts.js";
const load = async () => {
  const posts = await getPosts();
  return { posts: posts.slice(0, 4) };
};
export {
  load
};
