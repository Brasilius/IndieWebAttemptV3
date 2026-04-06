import { getProjects } from '$lib/projects.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projects = await getProjects();
	return { projects };
};
