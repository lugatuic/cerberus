/**
 * @module hooks.server.ts
 * @remarks This file contains middleware code.
 * Called for every HTTP request made to the app.
 * Used to inject login information.
 * This file reads the user's JWT cookie.
 */
import type { Handle } from '@sveltejs/kit';
import { ldap, session } from '$lib/server/api';

/**
 * This function gets the cookie `cerberus` from the
 * clients cookiejar and validates it using
 * {@see} {@link lib/server/api/<internal>/session_class}
 * @todo Document param type
 */
export const handle = (async ({ event, resolve }) => {
	console.log('Hook ran!'); // Pro Debugging
	const cookie = event.cookies.get('cerberus');
	event.locals.user = await session.get_session_string(cookie);
	return resolve(event);
}) satisfies Handle;
