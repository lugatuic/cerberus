/**
 * @file util.ts
 * @description General utility functions for server
 * side use.
 */

export async function _delay(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * @function _bind
 * @description Wrapper for ldapjs bind
 * The library function is callback based. The callback
 * often runs too late.
 * Maybe this should be an instance method?
 */
export async function _bind(cl: any, username: string, password: string): Promise<boolean> {
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

// export async function _search(cl: any, username: string): 
