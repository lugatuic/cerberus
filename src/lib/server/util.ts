import * as Api from './my-types';
import { env } from '$env/dynamic/private';
/**
 * General utility functions for server
 * side use.
 */
let { LDAP_BASE } = env;
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
	if (password === null || password === "" || password.length === 0) {
		throw new Error(`Refusing to bind with empty password for ${username}`)
	}
	return new Promise((resolve, reject) => {
		cl.bind(username, password, (err: any) => {
			if (err === null) {
				console.log(`Verified user ${username}`);
				resolve(true);
			} else {
				console.log(`Failed verifiction for user ${username}`);
				// This is not a reject as that would cause await to throw
				resolve(false);
				// reject(`Bind failed for ${username}`);
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
				// console.log(`Entry: ${entry}`);
				resolve(entry);
			});

// @ts-ignore
			res.on('error', err => {
				console.log(err);
				reject(err);
			});
// @ts-ignore
			res.on('searchRequest', srq => {
				console.log(`Sending req: ${srq}`);
			});
// @ts-ignore
			res.on('searchReference', srf => {
				console.log(`Reference: ${srf}`);
			});
// @ts-ignore
			res.on('end', result => console.log(`End: ${result}`));
		});
	});
}
/**
 * Utility to get blank object
 * This function employs Typescript Magic
 * to produce a dicttionary with keys from
 * an array defined in the .d.ts
 * The `satisfies` in the return is important.
 */
export function _new_memberinfo(): Api.MemberInfo {
	let result = Object.create(null);
	for (let k of Api._attrs_desired) {
		result[k] = "";
	}
	return result satisfies Api.MemberInfo;
}
/**
 * @function _marshall
 * @remarks This is a utility to massage the LDAP returned data
 * into type {@link Api.MemberInfo}.
 * Update: Func is now type-safe (in theory)
 */
export function _marshall(attrs: Api.LdapAttribute[]): Api.MemberInfo {
	// console.log(`** Attrs: ${JSON.stringify(attrs)}`);
	let result = _new_memberinfo() satisfies Api.MemberInfo;
	for (let a of attrs) {
		// console.log(`** A is ${JSON.stringify(a)}`);
		let t = a["type"];
		let val = a["values"].join(' | ');

		result[t] = val; // This is disgusting.

		// console.log(`Assigning ${t} to ${val}`);
	}
	return result;
}

export async function _modify(cl: Api.LdapClient, name: string,
															change: object): Promise<boolean> {
	console.log(`Modifying ${name}...`);
	return new Promise((resolve, reject) => {
		cl.modify(name, change, (err: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	});
}
