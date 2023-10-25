import type { PageServerLoad } from './$types';
import { PRIVATE_SERVER_API_URL } from '$env/static/private';
import { getLocaleFromURL } from '$lib/utils';
import type { WarpData } from '$types';

export const load = (async ({ fetch, params, url }) => {
	try {
		const locale = getLocaleFromURL(url);
		const apiUrl = `${PRIVATE_SERVER_API_URL}/pages/warp-tracker/${params.uid}?lang=${locale}`;

		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Oops! Something went wrong.');
		}
		const warpData: WarpData = await response.json();

		return {
			warpData,
			uid: params.uid
		};
	} catch (error) {
		// TODO: Should show different error page
		throw new Error('Oops! Something went wrong.');
	}
}) satisfies PageServerLoad;
