import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { ldap, session, member } from '$lib/server/api.ts';

export async function load ({locals}) {

	if (locals.user === null) {
		console.log("redirecting to login from member...");
		throw redirect(301, '/login');
	}
	return { user: locals.user };
}
