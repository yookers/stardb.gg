import { PUBLIC_SERVER_API_URL } from '$env/static/public';
import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const mode = import.meta.env.MODE;
	if (mode !== 'development') {
		if (request.url.startsWith(PUBLIC_SERVER_API_URL)) {
			// Clone the original request, but change the URL
			request = new Request(request.url.replace(PUBLIC_SERVER_API_URL, 'http://localhost:8000/api'), request);
		}
	}
	return fetch(request);
};

export const handle: Handle = async ({ event, resolve }) => {
	// If there is a session, load the user and pass it to the page
	let id = event.cookies.get('id');

    // If server doesn't respond to /auth/logout, manually delete the cookie
	const logOut = event.url.searchParams.has('logout');
	if (logOut) {
		event.cookies.delete('id', { path: '/' });
        id = undefined;
	}

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
					admin: user.admin,
					username: user.username
				};
			}
		}
	}

	return await resolve(event);
};
