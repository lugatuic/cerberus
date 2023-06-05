// New-ADUser 
// -SamAccountName $user.username 
// -EmployeeID $user.uin 
// -Department $user.major 
// -Company $user.college 
// -EmailAddress $user.email 
// -MobilePhone $user.phone 
// -GivenName $user.fn 
// -Surname $user.ln 
// -EmployeeNumber $user.receipt 
// -Name $someName 
// -Organization $user.netid 
// -Enable $true 
// -AccountPassword $newPassword 
// -Path "ou=november,ou=2019,ou=acmusers,dc=acm,dc=cs"

import type { PageServerLoad, Actions} from './$types';


export const load: PageServerLoad = async function(event) {
	return {};
}

export const actions = {
	default: async (event) => {

		let fdata: FormData = await event.request.formData();

		let data = Object.fromEntries(fdata);

		console.log(`Registration: ${JSON.stringify(data)}`)


	}
} satisfies Actions;
