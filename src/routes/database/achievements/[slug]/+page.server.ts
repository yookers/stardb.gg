import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import type { DatabaseAchievement } from '$types';

export const load = (async ({ fetch, params }) => {
	try {
		const response = await fetch(`${PUBLIC_SERVER_API_URL}/achievements/${params.slug}`);
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
