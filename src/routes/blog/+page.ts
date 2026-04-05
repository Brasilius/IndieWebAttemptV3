import { getPosts } from '$lib/posts.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await getPosts();
	return { posts };
};
