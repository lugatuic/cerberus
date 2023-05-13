/*
 * @file api.ts
 * This file is the "business logic" for this app.
 * LDAP interfacing, Session Management etc.
 */
console.log('api.ts loaded!'); // Professional Debugging

export type validationResult = { error: number; message: string };

// Wait I'm supposed to hate OO?

/*
 * @class ldap_class
 * Functions related to Ldap read/write
 * This class should *only* contain static methods
 */
class ldap_class {
	/*
	 * @function validateuser
	 * TODO: Implement this function properly
	 *
	 * Input: {username: str, password: str}
	 * Output: validationResult
	 * Expected: This function should check if the username and password
	 *           exist in the ActiveDirectory (interfaced with LDAP.js)
	 */
	validateUser({ username, password }): validationResult {
		console.log('validateUser called!');
		if (username === 'ACM' && password === 'testing') {
			return { error: 0, message: '' };
		} else {
			return { error: 1, message: 'Error!' };
		}
	}
}

/*
 * @class session_class
 * Functions related to cookies and session management
 */
class session_class {
	// TODO: Implement
	private cookie_tray: any;

	constructor() {
		this.cookie_tray = null;
	}

	/*
	 * @function @static create_session_string
	 * Create "secure" string to identify the authenticated
	 * user. Store it in a data store with an expiry (cookie-tray)
	 */
	create_session_string(username: string): string {
		return username === 'ACM' ? 'ABCXYZ69420' : username;
	}

	/*
	 * @function get_session_string
	 * Essentially Reverse @refer {create_session_string}
	 * Must perform cookie validation/freshness check!
	 * If cookie is stale, or non-existent return null
	 * If cookie is valid, return username.
	 * Scaling: This function will be called quite a lot of times.
	 */
	get_session_string(cookie: string): string | null {
		return cookie === 'ABCXYZ69420' ? 'ACM' : null;
	}
}

// Exports
const ldap = new ldap_class();
const session = new session_class();

export { ldap, session };
