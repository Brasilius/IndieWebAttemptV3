export type Project = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	image?: string;
	imageAlt?: string;
	link?: string;
	date: string;
};

export async function getProjects(): Promise<Project[]> {
	const modules = import.meta.glob('/src/projects/*.md', { eager: true });

	// Eagerly import all project images so Vite can hash/bundle them
	const imageModules = import.meta.glob('/src/lib/assets/*.{jpg,jpeg,png,gif,webp,svg}', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	// Build a filename → resolved URL map
	const imageMap: Record<string, string> = {};
	for (const [path, url] of Object.entries(imageModules)) {
		const filename = path.split('/').pop()!;
		imageMap[filename] = url;
	}

	const projects: Project[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const metadata = (mod as { metadata: Omit<Project, 'slug'> }).metadata;
		if (!metadata) continue;

		const resolvedImage = metadata.image ? imageMap[metadata.image] : undefined;

		projects.push({ slug, ...metadata, image: resolvedImage });
	}

	return projects.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}
