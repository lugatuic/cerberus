import type { Handle } from '@sveltejs/kit';
import { ldap, session } from '$lib/server/api.ts';

// TODO: Implement this properly in sync with login/page.server.ts
export const handle = (async ({ event, resolve }) => {
	console.log('Hook ran!'); // Pro Debugging
	const cookie = event.cookies.get('cookie');
	event.locals.user = session.get_session_string(cookie);
	return resolve(event);
}) satisfies Handle;
