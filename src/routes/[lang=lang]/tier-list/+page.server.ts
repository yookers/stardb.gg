import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { getLocaleFromURL } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	try {
		const locale = getLocaleFromURL(url);
		const res = await fetch(`${PUBLIC_SERVER_API_URL}/pages/community-tier-list?lang=${locale}`);

		if (!res.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}

		const tierListData = await res.json();

		return { tierListEntries: tierListData.entries, totalVotes: tierListData.total_votes, sextiles: tierListData.sextiles };
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
