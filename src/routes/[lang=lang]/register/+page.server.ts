import cookie from 'cookie';
import { getLocaleFromURL } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';
import { PRIVATE_SERVER_API_URL } from '$env/static/private';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch, cookies, url }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const email = form.get('email');
		const importLocalAchievements = form.get('importLocalAchievements');
        const locale = getLocaleFromURL(url);

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

		const response = await fetch(`${PRIVATE_SERVER_API_URL}/users/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
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
						throw redirect(301, `/${locale}/achievement-tracker`);
					}
				}
			}
		}

		if (response.status === 409) {
			return fail(409, { usernameTaken: true });
		}

		return fail(400, { serverError: true });
	}
} satisfies Actions;
