/// <reference path="api.d.ts" />
import { LDAP_BASE } from '$env/static/private';
/**
 * General utility functions for server
 * side use.
 */
export async function _delay(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * @function _bind
 * @desc Wrapper for ldapjs bind
 * The library function is callback based. The callback
 * often runs too late.
 * Maybe this should be an instance method?
 */
export async function _bind(cl: Api.LdapClient, username: string,
	password: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		cl.bind(username, password, (err: any) => {
			if (err === null) {
				console.log(`Verified user ${username}`);
				resolve(true);
			} else {
				console.log(`Failed verifiction for user ${username}`);
				// This is not a reject as that would cause await to throw
				resolve(false);
			}
		});
	});
}

export async function _search(cl: Api.LdapClient,
	opts: object): Promise<any> {
	return new Promise((resolve, reject) => {
		cl.search(LDAP_BASE, opts, (err: any, res: any) => {
			if (err) {
				reject(err);
			}
			res.on('searchEntry', (entry: any) => {
				console.log(`Entry: ${entry}`);
				resolve(entry);
			});
			res.on('error', err => {
				console.log(err);
				reject(err);
			});
			res.on('searchRequest', srq => {
				console.log(`Sending req: ${srq}`);
			});
			res.on('searchReference', srf => {
				console.log(`Reference: ${srf}`);
			});
			res.on('end', result => console.log(`End: ${result}`));
		});
	});
}
/** Utility to get blank object */
export function _new_memberinfo(): Api.MemberInfo {
		return {
			"cn": "",
			"description": "",
			"memberOf": "",
			"badPasswordTime": "",
		} satisfies Api.MemberInfo;
}
/**
 * @function _marshall
 * @remarks This is a utility to massage the LDAP returned data
 * into type {@link Api.MemberInfo}.
 * @todo This function uses disgusting unsafe JS.
 */
export function _marshall(attrs: Api.LdapAttribute[]): Api.MemberInfo {
	console.log(`** Attrs: ${JSON.stringify(attrs)}`);
	let result = _new_memberinfo() satisfies Api.MemberInfo;
	for (let a of attrs) {
		console.log(`** A is ${JSON.stringify(a)}`);
		let t = a["type"];
		let val = a["values"].join(' | ');

		// @ts-ignore
		result[t] = val; // This is disgusting.

		console.log(`Assigning ${t} to ${val}`);
	}
	return result;
}
