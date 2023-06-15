import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { ldap } from '$lib/server/api';
import { env } from '$env/dynamic/private';
import * as db from '$lib/server/db';
import * as crypto from 'node:crypto';

// export const load: PageServerLoad = async function (event) {
// };

const { CLIENT_SECRET, HMAC_KEY } = env;
export const actions = {
	discord: async (event) => {
		let fdata: FormData = await event.request.formData();

		let data = Object.fromEntries(fdata);

		if (!fdata.get('discord_code')) {
			return fail(400, { message: 'Missing discord info!' });
		}

		for (const k in data) {
			if (!data[k]) {
				delete data[k];
			}
		}
		const code = data['discord_code']!;
		const token_url = 'https://discord.com/api/oauth2/token';
		const revoke_url = 'https://discord.com/api/oauth2/token/revoke';
		const client_id = '1115994148206542909';
		// ############## CHANGE THIS #########################
		const client_secret = CLIENT_SECRET;
		// ############## CHANGE THIS #########################

		let redirect_uri = "http://localhost:5173/register";
		if (import.meta.env.PROD) {
			redirect_uri = "https://cerberus.acmuic.org/register";
		}
		const _token_body = {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: `${redirect_uri}`
		};
		// Thanks Stackoverflow!
		let token_body = new URLSearchParams();
		for (const key in _token_body) {
			// @ts-ignore
			token_body.append(key, `${_token_body[key]}`);
		}
		let token = await fetch(token_url, {
			method: 'POST',
			// API expects FormData submission (cringe)
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: token_body
		});

		let token_json = await token.json();
		console.log(token_json);
		let api_token = token_json['access_token'];
		let guilds_resp = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${api_token}`
			}
		});

		let user_info = await fetch(`https://discord.com/api/v10/users/@me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${api_token}`
			}
		});
		let user_info_json = await user_info.json();

		let user_email = user_info_json['email'] ?? undefined;
		let user_email_verified: boolean = user_info_json['verified'] ?? false;
		let mfa = user_info_json['mfa_enabled'] ?? false;
		let guilds = await guilds_resp.json();

		console.log('#### logging guilds!');
		let acm_guildid = '652006495675875359';
		let lug_guildid = '833734451866763285';
		let in_acm = false;
		for (let g of guilds) {
			let gid = g['id'];
			if (gid === acm_guildid || gid === lug_guildid) {
				in_acm = true;
			}
		}
		if (!in_acm) {
			return fail(400, { message: 'Not in ACM or LUG Discord!' });
		} else {
			console.log('##### USER IN ACM!');
		}
		console.log(user_info_json);
		if (in_acm && user_email_verified && user_email && mfa) {
			console.log(`Allowing user ${data['username']}`);
			let r = await final_add_user(data, user_info_json["id"]);
			if (!r.success) {
				return fail (400, {message: r.message});
			}
			return { success: r.success, message: r.message.toString() };
		} else {
			throw fail(400, { message: `Discord account must be in ACM/LUG discord, verfied email and 2FA` });
		}
		// console.log(`Registration: ${JSON.stringify(data)}`);
	},
	manual: async (event) => {
		let fdata: FormData = await event.request.formData();
		let data: Record<string, any> = Object.fromEntries(fdata);

		let buf_username = Buffer.from(data["username"]!);
		let buf_received = Buffer.from(data["verification"], 'hex');

		console.log(`Hashing: ${data["username"]}`);

		const key = Buffer.from(HMAC_KEY,'hex')
		let our_hmac = crypto.createHmac('sha1', key, {encoding: 'hex'});
		our_hmac.update(buf_username);
		let our_hmac_dgst = our_hmac.digest();

		console.log(our_hmac_dgst);
		console.log(`Received HMAC:` + buf_received);

		let is_equal = crypto.timingSafeEqual(buf_received, our_hmac_dgst);

		if (is_equal) {
			console.log(`** User ${data["username"]} passed verification!`);
			console.log(`Allowing user ${data['username']}`);
			try {
				let {success, message}= await final_add_user(data, undefined);
				if (!success) {
					return fail (400, {message});
				}
				return {success, message};
			} catch (e: any) {
				return fail(400, {message: e.toString()});
			}
		} else {
			return fail(400, {message: "Verification code incorrect!"});
		}

	}
} satisfies Actions;

async function final_add_user(data: object, did: string|undefined) {
	if (did) {
		console.log(`Checking discord ID: ${did}`);
		let exists = await db.exists(did);
		if (exists) {
			console.log("Discord already exists!");
			return {success: false, message: "Discord user already signed up!"};
		}
	}
	let r = await ldap.add_user(data);
	//@ts-ignore
	db.add(did, data["username"]);
	return { success: !r.error, message: r.message.toString() };
}
