import { g as getPosts } from "../../../chunks/posts.js";
const load = async () => {
  const posts = await getPosts();
  return { posts };
};
export {
  load
};
