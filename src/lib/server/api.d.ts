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
	 * @remarks 
	 * User data fetched from ldap.
	 * Keys are LDAP Attributes (important)
	 * Keys here **MUST** be string!
	 * {@link ./util/_new_memberinfo()}
	 * To add new attributes to fetch, just add the Ldap
	 * attribute name to the _attrs_desired array
	 * Typescript magic will do the rest.
	 * Note: the "as const" at the end is important.
	 */
	const _attrs_desired = ["cn", "description",
													"memberOf", "badPasswordTime"] as const;
	type attrs_desired = typeof _attrs_desired[number];
	type MemberInfo = Record<attrs_desired, string>;

	/**
	 * @type LdapAttribute
	 * @remarks This is the type of data
	 * returned from LDAPJs as determined
	 * by console.log. This is a helper type
	 * for intellisense and clarity
	 * @todo Get LdapJS types from @types
	 */
	interface LdapAttribute extends Object {
		"type": attrs_desired,
		"values": string[]
	};
}


	// interface MemberInfo extends Object {
	// 	"cn": string = "";
	// 	"description":string = "";
	// 	"memberOf": string[] | string = "";
	// 	"badPasswordTime": string = "";
	// };
