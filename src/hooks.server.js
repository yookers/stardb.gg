/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch }) {
	const mode = import.meta.env.MODE;
	if (mode !== 'development') {
		if (request.url.startsWith(`https://stardb.gg/api`)) {
			// clone the original request, but change the URL
			request = new Request(
				request.url.replace('https://stardb.gg/api', 'http://localhost:8000/api'),
				request
			);
		}
	}
	return fetch(request);
}
