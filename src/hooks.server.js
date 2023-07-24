import { PUBLIC_SERVER_API_URL } from '$env/static/public';

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({ request, fetch }) => {
	const mode = import.meta.env.MODE;
	if (mode !== 'development') {
		if (request.url.startsWith(PUBLIC_SERVER_API_URL)) {
			// Clone the original request, but change the URL
			request = new Request(
				request.url.replace(PUBLIC_SERVER_API_URL, 'http://localhost:8000/api'),
				request
			);
		}
	}
	return fetch(request);
};

export const handle = async ({ event, resolve }) => {
	// If there is a session, load the user and pass it to the page
	const id = event.cookies.get('id');

	if (id) {
		const res = await fetch(`${PUBLIC_SERVER_API_URL}/users/me`, {
			headers: {
				cookie: `id=${id}`
			}
		});
		if (res.ok) {
			const user = await res.json();
			if (user) {
				event.locals.user = {
					username: user.username,
					email: user.email,
					admin: user.admin,
					uids: user.uids
				};
			}
		}
	}

	return await resolve(event);
};
