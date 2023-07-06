export const load = async ({ fetch, params }) => {
	const response = await fetch(`/api/scores/${params.slug}`);
	const profileData = await response.json();
	return {
		profileData
	};
};

export const prerender = false;
