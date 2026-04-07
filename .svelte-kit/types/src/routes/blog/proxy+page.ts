// @ts-nocheck
import { getPosts } from '$lib/posts.js';
import type { PageLoad } from './$types';

export const load = async () => {
	const posts = await getPosts();
	return { posts };
};
;null as any as PageLoad;