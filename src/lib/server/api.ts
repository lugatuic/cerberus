/**
 * @file api.ts
 * This file is the "business logic" for this app.
 * LDAP interfacing, Session Management etc.
 */
import { TOKEN, LDAP_USER, LDAP_PASS, LDAP_URL } from '$env/static/private';
import * as jose from 'jose';

/** @ts-ignore */
import * as ldapjs from 'ldapjs';

import * as util from './util';

console.log('api.ts loaded!'); // Professionall Debugging

export type Result = { error: boolean; message: string };
/**
	* @type LdapClient
	* @description Placeholder till I get LdapJS types
	*/
export type LdapClient = any;

// Wait I'm supposed to hate OO?

/**
 * @class ldap_class
 * Functions related to Ldap read/write
 * This class should *only* contain static methods
 */
class ldap_class {
	private client: LdapClient;
	private client_user: LdapClient;
	private isBound: boolean;

	/**
	* BIND to LDAP here! Use the service account.
	* Add event handlers for reconnection, errors.
	*
	* UPDATE:
	* It is best practice to bind as the user to
	* authenticate! `client` is our client for admin
	* ops, client_user is for binding.
	* NOTE:
	* Connecting here makes the first load very slow!
	*/
	constructor() {
		console.log("Attempting LDAP contact...");
		this.isBound = false;
		this.client = this._connect();
		this.client_user = this._connect();

		this.isBound = false;
		this.client.bind(LDAP_USER, LDAP_PASS, (err: any) => {
			if (err !== null) {
				this.isBound = false;
				console.log(`Error in bind is ${err}`);
			} else {
				this.isBound = true;
			}
		});
	}

	private _connect(): LdapClient {
		const cl = ldapjs.createClient({
			url: [LDAP_URL],
			reconnect: true
		});
		cl.on('error', (err: any) => {
			if (err !== null)
				console.log(`LdapClient: ${err}`);
		});
		return cl;
	}

	/**
	 * @function validateUser
	 * This function is the single source of truth
	 * for User Authentication!
	 * 
	 * @param {string} user
	 * @param {string} password
	 * @return {Promise<Result>} 
	 * @desc: This function should check if the username and password
	 *           exist in the ActiveDirectory (interfaced with LDAP.js)
	 */
	async validateUser(user: string, password: string): Promise<Result> {
		console.log('validateUser called!');
		console.log(`Bound? ${this.isBound}`);
		// if (username === 'ACM' && password === 'testing') {
		// 	return { error: 0, message: '' };
		// } else {
		// 	return { error: 1, message: 'Error!' };
		// }
		console.log(`Attempting to bind as user ${user}`);

		let success = await util._bind(this.client_user, user, password);
		console.log(`Returning Success ${success}`);
		return {error: !success, message:''};
	}

	/**
	 * @function change_password
	 * TODO: Implement this function!
	 * Input: user: string, newpass: string
	 * Expected: User's password is changed to newpass.
	 * Notes:
	 * Need to BIND to LDAP with a service user (we already have one)
	 * This function will need to consume a secret.
	 * This **MUST** be done with an environment variable. (.env file)
	 * Use instance variables in this class. Ideally, bind when the class is created.
	 * DO NOT ATTEMPT IF U DONT KNOW WHAT YOU ARE DOING
	 */
	change_password(user: string, newpass: string): Result {
		console.log('change_password called!');
		return { error: false, message: '' };
	}
}

/**
 * @class session_class
 * Functions related to cookies and session management
 */
class session_class {
	// TODO: Implement
	private cookie_tray: any;
	private secret;

	constructor() {
		this.cookie_tray = null;
		this.secret = new TextEncoder().encode(TOKEN);
	}

	/*
	 * @function @static create_session_string
	 * Create "secure" string to identify the authenticated
	 * user. Store it in a data store with an expiry (cookie-tray)
	 * This is a username --> time-bound string mapping.
	 * Some form of hash function should ideally be used.
	 */
	async create_session_string(username: string): string {
		// return username === 'ACM' ? 'ABCXYZ69420' : username;
		const jwt = await new jose.SignJWT({ username })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setIssuer('acmlug')
			.setAudience('acmlug')
			.setExpirationTime('2h')
			.sign(this.secret);
		console.log(`Created JWT for ${username}: \n ${jwt}`);
		return jwt;
	}

	/*
	 * @function get_session_string
	 * Essentially Reverse @refer {create_session_string}
	 * Must perform cookie validation/freshness check!
	 * If cookie is stale, or non-existent return null
	 * If cookie is valid, return username.
	 * Scaling: This function will be called quite a lot of times.
	 */
	async get_session_string(cookie: string): string | null {
		// return cookie === 'ABCXYZ69420' ? 'ACM' : null;
		try {
			const { payload } = await jose.jwtVerify(cookie, this.secret, {
				issuer: 'acmlug',
				audience: 'acmlug'
			});
			// console.log(`Header:${protectedHeader}\nPayload:${payload}`);
			return payload.username;
		} catch (e) {
			console.log('JWTverify failed!');
			console.log(e);
			console.log(cookie);
			console.log(await cookie);
			return null;
		}
	}
}

// Exports
const ldap = new ldap_class();
const session = new session_class();

export { ldap, session };
