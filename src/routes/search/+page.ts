import { getPosts } from '$lib/posts';
import { getProjects } from '$lib/projects';

export async function load() {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

	// Load raw markdown for full-text search
	const rawPostModules = import.meta.glob('/src/posts/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const rawProjectModules = import.meta.glob('/src/projects/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const postContent: Record<string, string> = {};
	for (const [path, content] of Object.entries(rawPostModules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		postContent[slug] = content;
	}

	const projectContent: Record<string, string> = {};
	for (const [path, content] of Object.entries(rawProjectModules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		projectContent[slug] = content;
	}

	return { posts, projects, postContent, projectContent };
}
