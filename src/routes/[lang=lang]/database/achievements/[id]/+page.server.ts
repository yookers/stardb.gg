import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { getLocaleFromURL } from '$lib/utils';
import type { DatabaseAchievement } from '$types';

export const load = (async ({ fetch, params, url }) => {
	try {
		const locale = getLocaleFromURL(url);
		const apiUrl = `${PUBLIC_SERVER_API_URL}/achievements/${params.id}?lang=${locale}`;

		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error('Oops! Something went wrong.');
		}
		const achievementData: DatabaseAchievement = await response.json();
		return {
			achievementData
		};
	} catch (error) {
		// TODO: Should show different error page
		throw new Error('Oops! Something went wrong.');
	}
}) satisfies PageServerLoad;
