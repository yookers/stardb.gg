import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import { PRIVATE_SERVER_API_URL, PRIVATE_API_KEY } from '$env/static/private';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const mode = import.meta.env.MODE;
	if (request.url.startsWith(PRIVATE_SERVER_API_URL)) {
		// Create a new URL based on the environment
		let newUrl = request.url;
		if (mode !== 'development') {
			newUrl = request.url.replace(PRIVATE_SERVER_API_URL, 'http://localhost:8000/api');
		}
		// Set a new header with the 'x-api-key' included
		request.headers.set('x-api-key', PRIVATE_API_KEY);
		// Create a new request with the modified URL and headers
		request = new Request(newUrl, request);
	}
	return fetch(request);
};

export const handle: Handle = async ({ event, resolve }) => {
	// If there is a session, load the user and pass it to the page
	const id = event.cookies.get('id');

	if (id) {
		if (!event.locals.user) {
			const res = await fetch(`${PUBLIC_SERVER_API_URL}/users/me/username`, {
				headers: {
					cookie: `id=${id}`
				}
			});
			if (res.ok) {
				const username = await res.json();
				if (username) {
					event.locals.user = {
						username: username
					};
				}
			}
		}
		// If server doesn't respond to /auth/logout, manually delete the cookie
		const logOut = event.url.pathname.includes('/logout');
		if (logOut) {
			event.cookies.delete('id', { path: '/' });
			event.locals.user = undefined;
			throw redirect(301, '/');
		}
	} else if (!id) {
		event.locals.user = undefined;
	}

	return await resolve(event);
};
