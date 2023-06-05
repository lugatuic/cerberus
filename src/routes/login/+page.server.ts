import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api';

/** @remarks This is the `load` function for the /login page */
export let load: PageServerLoad = async function ({ locals }) {
	return { ldapStatus: 'Testing' };
};

/**
 *
 * This file contains server-side code for the /login component.
 *
 * This object represents "actions" that can be
 * triggered from the client.
 * Used to receive and process the form data from the client.
 */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		let user = data.get('username')?.toString();
		let pass = data.get('password')?.toString();
		console.log(`Validating user ${user}`);

		if (!user || !pass) {
			return fail(400, {});
		}
		let { error, message } = await ldap.validateUser(user, pass);
		if (error) {
			return fail(400, {my_error: true, my_message: "Invalid username/password."});
		}

		let session_token: string = await session.create_session_string(user);
		event.cookies.set('cerberus', session_token, { path: '/', httpOnly: false });
		console.log('set cookie!');
		return { my_success: true };
	}
} satisfies Actions;

