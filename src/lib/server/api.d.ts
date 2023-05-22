declare namespace Api {
	/** Type for internal communication */
	type Result = { error: boolean; message: string };
	/**
		* @type LdapClient
		* @description Placeholder till I get LdapJS types
		* @todo Get real types for LdapJS
		*/
	type LdapClient = any;

	/**
	 * User data fetched from ldap.
	 * Keys are LDAP Attributes (important)
	 * Keys here **MUST** be string!
	 * PLEASE update the function in util.js after changing
	 * the structure of this!
	 * {@link ./util/_new_memberinfo()}
	 */
	interface MemberInfo extends Object {
		"cn": string = "";
		"description":string = "";
		"memberOf": string[] | string = "";
		"badPasswordTime": string = "";
	};

	/**
	 * @type LdapAttribute
	 * @remarks This is the type of data
	 * returned from LDAPJs as determined
	 * by console.log. This is a helper type
	 * for intellisense and clarity
	 * @todo Get LdapJS types from @types
	 */
	interface LdapAttribute extends Object {
		"type": string,
		"values": string[]
	};
}

