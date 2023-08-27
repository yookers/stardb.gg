import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	try {
		const res = await fetch(`${PUBLIC_SERVER_API_URL}/pages/community-tier-list`);

		if (!res.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}

		const tierListData = await res.json();

		return { tierListEntries: tierListData.entries, totalVotes: tierListData.total_votes, sextiles: tierListData.sextiles };
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
