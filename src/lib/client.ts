export function _password_req(newpass: string): boolean {
	let _lower: boolean = /[a-z]+/.test(newpass);
	let _upper = /[A-Z]+/.test(newpass);
	let _number = /[0-9]+/.test(newpass);
	let _special = /\W|_/.test(newpass);

	let _final = _lower && _upper && _number && _special;
	return _final;
}
