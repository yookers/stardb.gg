import type { PageServerLoad } from './$types';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { PRIVATE_API_KEY, PRIVATE_SERVER_API_URL } from '$env/static/private';


export const load = (async ({ fetch, url }) => {
	// Parse the page query parameter
	let pageNumber = Number(url.searchParams.get('page'));
	if (isNaN(pageNumber) || pageNumber < 1) {
		pageNumber = 1;
	}
	const limit = 25;
	const offset = (pageNumber - 1) * limit;
	const region = url.searchParams.get('region') || '';
	const query = url.searchParams.get('query') || '';
	const uid = url.searchParams.get('uid') || '';

	// Create a new URL object
	const apiURL = new URL(
		uid ? `${PUBLIC_SERVER_API_URL}/scores/achievements/${uid}` : `${PRIVATE_SERVER_API_URL}/leaderboard`
	);

	if (!uid) {
		apiURL.searchParams.set('limit', limit.toString());
		apiURL.searchParams.set('offset', offset.toString());

		if (region !== 'all' && region !== '') {
			apiURL.searchParams.set('region', region);
		}
		if (query !== '') {
			apiURL.searchParams.set('query', query);
		}
	}

	try {
		const response = await fetch(apiURL, {
            headers: {
                authorization: `ApiKey ${PRIVATE_API_KEY}`
        }});
        
		const data = await response.json();

		if (!response.ok) {
			return { error: { status: 400, message: 'Oops! Something went wrong.' } };
		}

		if (uid) {
			return { playerScores: [data] };
		} else {
			const regionCount = [
				{ region: 'Total', count: data.count },
				{ region: 'NA', count: data.count_na },
				{ region: 'EU', count: data.count_eu },
				{ region: 'ASIA', count: data.count_asia },
				{ region: 'CN', count: data.count_cn }
			];
			return { playerScores: data.scores, regionCount, queryCount: data.count_query };
		}
	} catch (error) {
		return { error: { status: 400, message: 'Oops! Something went wrong.' } };
	}
}) satisfies PageServerLoad;
