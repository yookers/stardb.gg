import type { PageServerLoad } from './$types';
import { PRIVATE_SERVER_API_URL } from '$env/static/private';
import type { ProfileData } from '$types';

export const load = (async ({ fetch, params }) => {
	try {
		const response = await fetch(`${PRIVATE_SERVER_API_URL}/pages/profiles/${params.uid}`);
		if (!response.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}

		const profileData: ProfileData = await response.json();

		return {
			playerData: profileData.mihomo.player,
			charactersData: profileData.mihomo.characters,
			profileDetails: {
				rank_global: profileData.rank_global,
				rank_regional: profileData.rank_regional,
				top_global: profileData.top_global,
				top_regional: profileData.top_regional,
				updated_at: profileData.updated_at
			}
		};
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
