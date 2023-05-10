import type { Actions } from './$types';
import {fail} from '@sveltejs/kit';

import ldap from '$lib/ldap.ts';


export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let user = data.get('username');
		let pass = data.get('password');
		let { error, message }= ldap.validateUser(user, pass);

		if (error === 0) {
			return { error: true };
		} else {
			return { success: true, message };
		}
		

  }
} satisfies Actions;
