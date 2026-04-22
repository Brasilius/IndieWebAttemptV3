import { getPosts } from '$lib/posts.js';
import { getProjects } from '$lib/projects.js';
import type { RequestHandler } from './$types';

const SITE = 'https://nielslarsen.dev';

const staticRoutes = ['', '/about', '/blog', '/projects', '/resume', '/now', '/search'];

export const GET: RequestHandler = async () => {
	const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

	const urls = [
		...staticRoutes.map((path) => ({ loc: `${SITE}${path}` })),
		...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.date })),
		...projects.map((p) => ({ loc: `${SITE}/projects/${p.slug}`, lastmod: p.date }))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
