const apiURL = import.meta.env.VITE_API_URL;

export const load = async ({ fetch, params }) => {
	const response = await fetch(`${apiURL}/${params.slug}`);
	const profileData = await response.json();
	return {
		profileData
	};
};

export const prerender = false;