import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { ldap } from '$lib/server/api';

export let load: LayoutServerLoad = async function ({ locals }) {
	console.log('loading member data');
	if (locals.user === null) {
		console.log('redirecting to login...');
		throw redirect(301, '/login');
	}
	// const result = { user: locals.user } satisfies App.Locals;
	const userinfo = ldap.get_member_info(locals.user);
	return userinfo;
};

export const prerender = false;
