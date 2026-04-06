import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../projects/${params.slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata as {
				title: string;
				date: string;
				description?: string;
				tags?: string[];
				link?: string;
				image?: string;
				imageAlt?: string;
			}
		};
	} catch {
		throw error(404, `Project "${params.slug}" not found`);
	}
};
