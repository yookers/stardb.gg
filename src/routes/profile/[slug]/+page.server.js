import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export const load = async ({ fetch, params }) => {
	const response = await fetch(`${PUBLIC_SERVER_API_URL}/scores/${params.slug}`);
	const profileData = await response.json();
	return {
		profileData
	};
};

export const prerender = false;
