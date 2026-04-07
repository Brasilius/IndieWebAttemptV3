// @ts-nocheck
import { getProjects } from '$lib/projects.js';
import type { PageLoad } from './$types';

export const load = async () => {
	const projects = await getProjects();
	return { projects };
};
;null as any as PageLoad;