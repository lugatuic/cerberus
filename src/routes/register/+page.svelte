<script lang="ts">
	import { enhance, applyAction } from '$app/forms'

	import {_password_req} from '$lib/client';
	let ui_msg: string = undefined;
	function myEnhance({data, cancel}) {
		if (data.get("password") !== data.get("password2")) {
		 	ui_msg = "Password mismatch!"
		 	cancel();
		}
		if (!_password_req(data.get("password"))) {
			ui_msg = "Password must contain lower,upper,digit,special";
			cancel();
		}
		return async ({ result, update }) => {
			await applyAction(result);
			update();
		}
	}
</script>

<header>
	<h1>Register</h1>
</header>
<form
	method="POST"
	use:enhance={myEnhance}>
	{#if ui_msg}<h1>{ui_msg}</h1>{/if}
	<label>
		NetID (new Username):
		<input name="username" type="text" required pattern="[a-z]+[0-9]+"/>
	</label>
	<br />
	<label>
		Create a new Password:
		<input name="password" type="password" required/>
	</label>
	<br />
	<label>
		Re-enter new Password:
		<input name="password2" type="password" required/>
	</label>
	<br />
	<label>
		UIN:
		<input name="uin" type="tel" pattern="[0-9]+" required />
	</label>
	<br />
	<label>
		Email:
		<input name="email" type="email" required />
	</label>
	<br />
	<label>
		Given Name:
		<input name="gname" type="text" required/>
	</label>
	<br />
	<label>
		Last Name:
		<input name="lname" type="text" />
	</label>
	<br />
	<label>
		Major:
		<input name="major" type="text"  />
	</label>
	<br />
	<label>
		College:
		<input name="college" type="text"  />
	</label>
	<br />
	<label>
		Phone:
		<input name="phone" type="tel" />
	</label>
	<button type="submit">Submit the form</button>

</form>

<!-- New-ADUser  -->
<!-- -SamAccountName $user.username  -->
<!-- -EmployeeID $user.uin  -->
<!-- -Department $user.major  -->
<!-- -Company $user.college  -->
<!-- -EmailAddress $user.email  -->
<!-- -MobilePhone $user.phone  -->
<!-- -GivenName $user.fn  -->
<!-- -Surname $user.ln  -->
<!-- -EmployeeNumber $user.receipt  -->
<!-- -Name $someName  -->
<!-- -Organization $user.netid  -->
<!-- -Enable $true  -->
<!-- -AccountPassword $newPassword  -->
<!-- -Path "ou=november,ou=2019,ou=acmusers,dc=acm,dc=cs" -->
