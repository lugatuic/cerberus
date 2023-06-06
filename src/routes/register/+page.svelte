<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { slide } from 'svelte/transition';

	import { _password_req } from '$lib/client';
	let ui_msg: string = undefined;
	function myEnhance({ data, cancel }) {
		if (data.get('password') !== data.get('password2')) {
			ui_msg = 'Password mismatch!';
			cancel();
		}
		if (!_password_req(data.get('password'))) {
			ui_msg = 'Password must contain lower,upper,digit,special';
			cancel();
		}
		return async ({ result, update }) => {
			await applyAction(result);
			update();
		};
	}
</script>

<!-- TODO: Add placeholders and title attributes -->
<div transition:slide>
	<header>
		<h1>Register</h1>
	</header>
	<form id="regform" method="POST" use:enhance={myEnhance}>
		{#if ui_msg}<h1>{ui_msg}</h1>{/if}
	</form>
	<table role="presentation">
		<tr>
			<td>NetID (new Username):</td>
			<td><input form="regform" name="username" type="text" required
								 pattern="[a-z]+[0-9]+" /></td>
		</tr>
		<tr>
			<td>Create a new Password:</td>
			<td><input form="regform" name="password" type="password" required /></td>
		</tr>
		<tr>
			<td>Re-enter new Password:</td>
			<td><input form="regform" name="password2" type="password" required /></td>
		</tr>
		<tr>
			<td>UIN:</td>
			<td><input form="regform" name="uin" type="tel" pattern="[0-9]+" required /></td>
		</tr>
		<tr>
			<td>Email:</td>
			<td><input form="regform" name="email" type="email" required /></td>
		</tr>
		<tr>
			<td>Given Name:</td>
			<td><input form="regform" name="gname" type="text" required /></td>
		</tr>
		<tr>
			<td>Last Name:</td>
			<td><input form="regform" name="lname" type="text" /></td>
		</tr>
		<tr>
			<td>Major:</td>
			<td><input form="regform" name="major" type="text" /></td>
		</tr>
		<tr>
			<td>College:</td>
			<td><input form="regform" name="college" type="text" /></td>
		</tr>
		<tr>
			<td>Phone:</td>
			<td><input form="regform" name="phone" type="tel" /></td>
		</tr>
	</table>
	<button form="regform" type="submit">Submit the form</button>
</div>
