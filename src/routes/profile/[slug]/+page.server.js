import { PUBLIC_CLIENT_API_URL } from '$env/static/public';

export const load = async ({ fetch, params }) => {
	const response = await fetch(`${PUBLIC_CLIENT_API_URL}/${params.slug}`);
	const profileData = await response.json();
	return {
		profileData
	};
};

export const prerender = false;
