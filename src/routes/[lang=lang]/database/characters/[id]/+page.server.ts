import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load = (async ({ fetch, params }) => {
	try {
		const response = await fetch(`${PUBLIC_SERVER_API_URL}/characters/${params.id}`);
		if (!response.ok) {
			throw new Error('Oops! Something went wrong.');
		}
		const characterData = await response.json();
		return {
			characterData
		};
	} catch (error) {
		// TODO: Should show different error page
		throw new Error('Oops! Something went wrong.');
	}
}) satisfies PageServerLoad;
