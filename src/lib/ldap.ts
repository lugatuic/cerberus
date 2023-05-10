export type validationResult
	= {error: number, message: string};


export default class ldap {

	// TODO: Implement this function
	static validateUser ({username, password}) : validationResult {
		console.log("validateUser called!");
		if (username === "ACM" && password === "testing") {
			return {error: 0, message: ""};
		} else {
			return {error: 1, message: "Error!"};
		}
	}

};
