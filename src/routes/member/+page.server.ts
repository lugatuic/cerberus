/// <reference path="../../lib/server/api.d.ts" />
import type { PageServerLoad } from './$types';
import { ldap } from '$lib/server/api';

export const load: PageServerLoad = async function ({ params, locals}) {
	let info: Api.MemberInfo;
	if (locals.user) {
		info = await ldap.get_member_info(locals.user);
		// console.log(`Page load returning ${Object.values(info)}`)
		console.log(`Page load returning ${JSON.stringify(info)}`)
		return info;
	} else {
		console.log(`Page load returning empty!`);
		return {};
	}
}
