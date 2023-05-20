declare module 'api-types' {
	 export type Result = { error: boolean; message: string };
	/**
		* @type LdapClient
		* @description Placeholder till I get LdapJS types
		* @todo Get real types for LdapJS
		*/
	 export type LdapClient = any;

	 export type MemberInfo = {
		cn: string,
		description: string,
		memberOf: string[],
		badPasswordTime: string
	};
}

