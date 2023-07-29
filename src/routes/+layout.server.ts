import type { LayoutServerLoad } from './$types';
export const load = (async ({ locals, url }) => {
	return {
		user: locals.user,
		currentPath: url.pathname
	};
}) satisfies LayoutServerLoad;

//export const prerender = true;
