import { env } from '$env/dynamic/private';
import knex, {Knex} from 'knex';
import path from 'node:path';
const { DB_PATH_PREFIX } = env;

const knx: Knex = knex({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(DB_PATH_PREFIX ?? ".", "cerberus-users.db"),
	},
	useNullAsDefault: true
});

export interface User {
	id: number,
	discord_id: string|undefined,
	netid: string
}

knx.schema.hasTable('users').then(function (exists) {
	if (!exists) {
		return knx.schema.createTable('users', function (table) {
			table.increments();
			table.string('discord_id');
			table.string('netid');
		});
	}
});

export async function add(discord_id: string|undefined, netid: string) {
	return await knx.insert({
		discord_id: discord_id ?? "",
		netid
	}).into('users');
}


export async function exists(discord_id: string) {
	let items: User[] = await knx.select().table('users');

	for (let i of items) {
		if (i.discord_id === discord_id) {
			console.log(`Exists: ${i}`);
			return true;
		}
	}
	return false;
}
