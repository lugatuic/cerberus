import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api.ts';

export async function load ({ locals }) {
	if (locals.user === null) {
		return { user: "None"};
	}
	return { user: locals.user };
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let user = data.get('username');
		let pass = data.get('password');
		let { error, message } = ldap.validateUser(user, pass);

		if (error === 0) {
			return { error: true };
		}

		let session_token: str = session.create_session_string(user);
		event.cookies.set('cookie', session_token, { path: '/' });
		console.log("set cookie!");
		return { success: true, message };
	}
} satisfies Actions;
