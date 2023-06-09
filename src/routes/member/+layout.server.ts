import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { ldap } from '$lib/server/api';

/**
 * Server-side code common to all pages /member/*
 * Enforces user login.
 * This function redirects any client that is not authenticated
 * @experimental Fetch logged in users info from LDAP and display
 */
export let load: LayoutServerLoad = async function ({ locals }) {
	console.log('loading member data');
	if (locals.user === null) {
		console.log('redirecting to login...');
		throw redirect(301, '/login');
	}
	// const result = { user: locals.user } satisfies App.Locals;
	return locals;
};

export const prerender = false;
