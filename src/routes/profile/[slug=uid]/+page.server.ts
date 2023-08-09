import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`${PUBLIC_SERVER_API_URL}/mihomo/${params.slug}`);
	if (!response.ok) {
		throw error(response.status, 'User not found');
	}
	const profileData = await response.json();
	return {
		playerData: profileData.player,
		charactersData: profileData.characters
	};
}) satisfies PageServerLoad;

export const prerender = false;
