import { PUBLIC_SERVER_API_URL } from '$env/static/public';

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch }) {
	const mode = import.meta.env.MODE;
	if (mode !== 'development') {
		if (request.url.startsWith(PUBLIC_SERVER_API_URL)) {
			// clone the original request, but change the URL
			request = new Request(
				request.url.replace(PUBLIC_SERVER_API_URL, 'http://localhost:8000/api'),
				request
			);
		}
	}
	return fetch(request);
}
