import type { LayoutServerLoad } from './$types';

/**
 * This file runs server-side to provide data for the
 * `layout` of every page.
 * @todo Document param type
 */
export let load: LayoutServerLoad = async function ({ locals }) {
	if (locals.user === null) {
		return { user: null };
	}
	return { user: locals.user };
};

/*
 * Note to self:
 * Do **NOT** change csr, ssr, prerender options for this component!
 * It **WILL** gaslight you!
 */
