export async function load({ locals }) {
	if (locals.user === null) {
		return { user: 'None' };
	}
	return { user: locals.user };
}
