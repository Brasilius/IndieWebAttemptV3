import { getPosts } from '$lib/posts.js';
import { getProjects } from '$lib/projects.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
	return { posts: posts.slice(0, 4), projects: projects.slice(0, 4) };
};
