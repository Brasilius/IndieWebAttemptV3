export type Post = {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	published?: boolean;
};

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });
	const posts: Post[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const metadata = (mod as { metadata: Omit<Post, 'slug'> }).metadata;
		if (metadata && metadata.published !== false) {
			posts.push({ slug, ...metadata });
		}
	}

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}
