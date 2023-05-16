export async function load({ locals }) {
	if (locals.user === null) {
		return { user: null };
	}
	return { user: locals.user };
}

/*
 * Note to self:
 * Do **NOT** change csr, ssr, prerender options for this component!
 * It **WILL** gaslight you!
 */
