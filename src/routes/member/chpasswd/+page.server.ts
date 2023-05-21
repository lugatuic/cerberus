import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let user = event.locals.user;
		let pass = data.get('newpass');
		let pass2 = data.get('newpass2');

		// Check if pass === pass2

		// @ts-ignore
		let { error, message } = ldap.change_password(user, pass2);

		return { success: error, message };
	}
} satisfies Actions;
