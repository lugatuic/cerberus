import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api';

/**
 * @alpha
 * This page should let the user change their password.
 * [WIP]
 */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		let user = event.locals.user;
		let oldpass = data.get('currpass');
		let pass = data.get('newpass');
		let pass2 = data.get('newpass2');

		// Check if pass === pass2

		// @ts-ignore
		let { error, message } = await ldap.change_password(user, oldpass, pass2);

		if (error) {
			return fail(400, { error: true, message });
		}
		return { success: true, message };
	}
} satisfies Actions;
