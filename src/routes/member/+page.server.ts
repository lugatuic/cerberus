import type { PageServerLoad } from './$types';
import { ldap } from '$lib/server/api';
import type * as Api from '$lib/server/my-types'
import { _sane_date } from '$lib/server/util';

export const load: PageServerLoad = async function ({ params, locals}) {
	if (!locals.user) {
		return {};
	}

	let info: Api.MemberInfo = await ldap.get_member_info(locals.user);

	info.lastLogon = _sane_date(info.lastLogon).toDateString();
	info.badPasswordTime = _sane_date(info.badPasswordTime).toDateString();
	return {info};
}
