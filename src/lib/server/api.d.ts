declare global {
	declare namespace Api {
	 type Result = { error: boolean; message: string };
	/**
		* @type LdapClient
		* @description Placeholder till I get LdapJS types
		* @todo Get real types for LdapJS
		*/
	 type LdapClient = any;

	 type MemberInfo = {
		cn: string,
		description: string,
		memberOf: string[],
		badPasswordTime: string
	};
	}
}

export {};
