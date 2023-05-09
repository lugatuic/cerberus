import type { Actions } from './$types';
import {fail} from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		console.log(data);

		let username = data.get('username');
		let password = data.get('password');
		if (username === "ACM" && password === "testing") {
			console.log("Success!")
			return {success: true};
		} else {
			return fail(400, {username, error: true});
		}
  }
} satisfies Actions;
