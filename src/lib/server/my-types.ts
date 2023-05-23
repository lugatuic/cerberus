/**
 * @module
 * This file is the "header file" for api.ts
 * Same concept as C header files
 * Importing '$lib/server/api' will give the object
 * defined by this file.
 */
/** Type for internal communication */
export type Result = { error: boolean; message: string };
/**
	* @type LdapClient
	* @description Placeholder till I get LdapJS types
	* @todo Get real types for LdapJS
	*/
export type LdapClient = any;

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
export const _attrs_desired = ["cn", "description",
	"memberOf", "badPasswordTime"] as const;
export type attrs_desired = typeof _attrs_desired[number];
export type MemberInfo = Record<attrs_desired, string>;

/**
	* @type LdapAttribute
	* @remarks This is the type of data
	* returned from LDAPJs as determined
	* by console.log. This is a helper type
	* for intellisense and clarity
	* @todo Get LdapJS types from @types
	*/
export interface LdapAttribute extends Object {
	"type": attrs_desired,
	"values": string[]
};
// declare class ldap_class {
// 	private client: LdapClient;
// 	private client_user: LdapClient;
// 	private error: boolean;

// 	async validateUser(user?: string, password?: string): Promise<Result>;
// 	change_password(string, string): Result;
// 	async get_member_info(username: string): Promise<MemberInfo>;
// }

// declare class session_class {
// 	private secret: Uint8Array;

// 	constructor();
// 	async create_session_string(username: string): Promise<string>;
// 	async get_session_string(cookie?: string): Promise<string|null>;
// }

// declare const ldap: ldap_class;
// declare const session: session_class;
