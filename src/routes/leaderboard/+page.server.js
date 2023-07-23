import { error } from '@sveltejs/kit';
import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export async function load({ fetch, url }) {
    // Parse the page query parameter
    let pageNumber = Number(url.searchParams.get('page'));
    if (isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
    }
    const limit = 25;
    const offset = (pageNumber - 1) * limit;
    const region = url.searchParams.get('region') || '';
    const query = url.searchParams.get('query') || '';

    let apiURL = `${PUBLIC_SERVER_API_URL}/scores?limit=${limit}&offset=${offset}`;
    if (region !== 'all' && region !== '') {
        apiURL += `&region=${region}`;
    }
    if (query !== '') {
        apiURL += `&query=${query}`;
    }

    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.ok) {
        const regionCount = [
            { region: 'Total', count: data.count },
            { region: 'NA', count: data.count_na },
            { region: 'EU', count: data.count_eu },
            { region: 'ASIA', count: data.count_asia },
            { region: 'CN', count: data.count_cn },
        ];
        return { playerScores: data.scores, regionCount };

    } else {
        throw error(response.status, data.error);
    }
}

/* export const load = async ({ fetch }) => {
    const response = await fetch(`scores-sample.json`);
    const data = await response.json();
    return {
        achievementsData: data,
    };
}; */