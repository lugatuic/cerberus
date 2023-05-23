import type { PageServerLoad } from './$types';
import { ldap } from '$lib/server/api';

export const load: PageServerLoad = async function ({ params, locals}) {
	if (!locals.user) {
		return {};
	}

	let info = await ldap.get_member_info(locals.user);

	info.badPasswordTime = new Date(info.badPasswordTime).toDateString();
	console.log(`Page load returning ${JSON.stringify(info)}`)
	return {...info};
}
