// @ts-nocheck
import { getPosts } from '$lib/posts.js';
import type { PageLoad } from './$types';

export const load = async () => {
	const posts = await getPosts();
	return { posts: posts.slice(0, 4) };
};
;null as any as PageLoad;