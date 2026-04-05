import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata as {
				title: string;
				date: string;
				description?: string;
				tags?: string[];
			}
		};
	} catch {
		throw error(404, `Post "${params.slug}" not found`);
	}
};
