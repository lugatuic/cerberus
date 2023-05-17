import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api.ts';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let user = data.get('username');
		let pass = data.get('password');
		console.log(`Validating user ${user}`)
		let { error, message } = await ldap.validateUser(user, pass);

		if (error) {
			return { error };
		}

		let session_token: string = await session.create_session_string(user);
		event.cookies.set('cerberus', session_token, { path: '/', httpOnly: false, });
		console.log('set cookie!');
		return { success: true, message, user };
	}
} satisfies Actions;
