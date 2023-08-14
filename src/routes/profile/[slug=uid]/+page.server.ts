import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load = (async ({ fetch, params }) => {
	try {
		const response = await fetch(`${PUBLIC_SERVER_API_URL}/mihomo/${params.slug}`);
		if (!response.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}
		const profileData = await response.json();
		return {
			playerData: profileData.player,
			charactersData: profileData.characters
		};
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
