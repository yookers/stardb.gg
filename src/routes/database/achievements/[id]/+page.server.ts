import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import type { DatabaseAchievement } from '$types';

export const load = (async ({ fetch, params, url }) => {
	try {
        const selectedLanguageID = url.searchParams.get('lang');
        const apiUrl = selectedLanguageID
			? `${PUBLIC_SERVER_API_URL}/achievements/${params.id}?lang=${selectedLanguageID}`
			: `${PUBLIC_SERVER_API_URL}/achievements/${params.id}`;

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
