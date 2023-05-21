/**
 * @module
 * This file contains server-side code for the /login component.
 */
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

import { ldap, session } from '$lib/server/api';

/** @remarks This is the `load` function for the /login page */
export let load: PageServerLoad = async function ({ locals }) {
	return { ldapStatus: 'Testing' };
};

/**
 * This object represents "actions" that can be
 * triggered from the client.
 * Used to receive and process the form data from the client.
 */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let user = data.get('username')?.toString();
		let pass = data.get('password')?.toString();
		console.log(`Validating user ${user}`);

		if (!user || !pass) {
			return { error: true, message: 'Missing Username or Password!' };
		}
		let { error, message } = await ldap.validateUser(user, pass);
		if (error) {
			return { error };
		}

		let session_token: string = await session.create_session_string(user);
		event.cookies.set('cerberus', session_token, { path: '/', httpOnly: false });
		console.log('set cookie!');
		return { success: true, message, user };
	}
} satisfies Actions;

