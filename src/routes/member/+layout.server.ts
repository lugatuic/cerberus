import { redirect } from '@sveltejs/kit';

import type {LayoutServerLoad} from './$types';

export let load: LayoutServerLoad = async function ({ locals }) {
	console.log('loading member data');
	if (locals.user === null) {
		console.log('redirecting to login...');
		throw redirect(301, '/login');
	}
	const result = { user: locals.user } satisfies App.Locals;
	return result;
}
