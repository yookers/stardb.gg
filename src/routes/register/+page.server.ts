import cookie from 'cookie';
import { fail, redirect } from '@sveltejs/kit';
import { PRIVATE_SERVER_API_URL, PRIVATE_API_KEY } from '$env/static/private';
import type { Action, Actions } from './$types';

const register: Action = async ({ request, fetch, cookies }) => {
	const form = await request.formData();
	const username = form.get('username');
	const password = form.get('password');
	const email = form.get('email');
	const importLocalAchievements = form.get('importLocalAchievements');

	const payload: {
		username: FormDataEntryValue | null;
		password: FormDataEntryValue | null;
		email?: FormDataEntryValue | null;
	} = {
		username,
		password
	};

	if (email) {
		payload.email = email;
	}

	const response = await fetch(`${PRIVATE_SERVER_API_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `ApiKey ${PRIVATE_API_KEY}`
		},
		body: JSON.stringify(payload)
	});

	if (response.ok) {
		const setCookieHeader = response.headers.get('Set-Cookie');
		if (setCookieHeader) {
			const parsed = cookie.parse(setCookieHeader);
			if (parsed.id && parsed['Max-Age']) {
				cookies.set('id', parsed.id, { path: '/', maxAge: parseInt(parsed['Max-Age']) });
				if (importLocalAchievements) {
					return { status: 200 };
				} else {
					throw redirect(301, '/achievement-tracker');
				}
			}
		}
	}

	if (response.status === 409) {
		return fail(409, { usernameTaken: true });
	}

	return fail(400, { serverError: true });
};

export const actions: Actions = { register };
