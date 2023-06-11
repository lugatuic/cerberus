// New-ADUser
// -SamAccountName $user.username
// -EmployeeID $user.uin
// -Department $user.major
// -Company $user.college
// -EmailAddress $user.email
// -MobilePhone $user.phone
// -GivenName $user.fn
// -Surname $user.ln
// -EmployeeNumber $user.receipt
// -Name $someName
// -Organization $user.netid
// -Enable $true
// -AccountPassword $newPassword
// -Path "ou=november,ou=2019,ou=acmusers,dc=acm,dc=cs"

/*
	#token_type=Bearer&access_token=KluaxcfjPPVvjWplHbrjJUnJPJ7ebj&expires_in=604800&scope=guilds+identify
	API: GET /users/@me/guilds
	
	*/
import type { PageServerLoad, Actions } from './$types';
import {fail} from '@sveltejs/kit';
import { ldap } from '$lib/server/api'
import type {URL} from 'node:url';

export const load: PageServerLoad = async function (event) {
	let search_params = event.url.searchParams;
	let code = search_params.get("code");

	event.locals.discord_token = code ?? undefined;
	return { discord_code: code };
};

export const actions = {
	default: async (event) => {
		let fdata: FormData = await event.request.formData();

		let data = Object.fromEntries(fdata);

		if (!fdata.get("discord_code")) {
			throw fail(400, {message: "Missing discord info!"});
		}
		// let discordRE = /^#token_type=(\w+)&access_token=(\w+)&expires_in=(\d+).*$/g;
		// let discord_tokens = fdata.get("discord")?.toString();
		// let matches = discord_tokens!.matchAll(discordRE);
		// Iterator containing ONE iterable with a VALUE property
		// 0th pos is the whole string, 1st is 1st match group, etc.
		// let api_token = matches.next().value[2];

		const code = data["discord_code"]!;
		const token_url = "https://discord.com/api/oauth2/token";
		const revoke_url = "https://discord.com/api/oauth2/token/revoke";
		const client_id = "1115994148206542909";
		// ############## CHANGE THIS #########################
		const client_secret = "";
		// ############## CHANGE THIS #########################

		const _token_body = {
			'client_id': client_id,
			'client_secret': client_secret,
			'grant_type': 'authorization_code',
			'code': code,
			'redirect_uri': `http://localhost:5173/register`
		}
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
		let api_token = token_json["access_token"];
		let guilds_resp = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${api_token}`,
			},
		});

		let user_info = await fetch(`https://discord.com/api/v10/users/@me`,{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${api_token}`
			}
		})
		let user_info_json = await user_info.json();

		let user_email = user_info_json["email"] ?? undefined;
		let user_email_verified: boolean = user_info_json["verified"] ?? false;
		let mfa = user_info_json["mfa_enabled"] ?? false;
		let guilds = await guilds_resp.json();

		console.log("#### logging guilds!");
		let acm_guildid = "652006495675875359";
		let in_acm = false;
		for (let g of guilds) {
			let gid = g["id"];
			if (gid === acm_guildid) {
				in_acm = true;
			}
		}
		if (!in_acm) {
			throw fail(400, {message: "Not in ACM!"});
		} else {
			console.log("##### USER IN ACM!");
		}
		console.log(user_info_json);
		if (in_acm && user_email_verified && user_email && mfa) {
			let r = await ldap.add_user(data);
			return {success: !r.error, message: r.message}
		} else {
			throw fail(400, {message: `Discord account must be in ACM discord, verfied email and 2FA`});
		}
		// console.log(`Registration: ${JSON.stringify(data)}`);
	}
} satisfies Actions;
