<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	import {slide} from 'svelte/transition';
	export let data: PageData;
	export let form: ActionData;

	let newpass = '', confirmpass = '';
	let ui_msg = '';
	let newpass_elt: HTMLInputElement;
	let confirm_elt: HTMLInputElement;

	let thinking = false;
	function enhcFunc({formEl, formData, action, cancel, submitter }) {

		let _lower: bool = /[a-z]+/.test(newpass);
		let _upper = /[A-Z]+/.test(newpass);
		let _number = /[0-9]+/.test(newpass);
		let _special = /\W|_/.test(newpass);
		
		let _final = _lower && _upper && _number && _special;
		if (!_final) {
			ui_msg = "Password: 8 chars, must contain lowercase,uppercase,number,special";
			// newpass_elt.setCustomValidity("Password: 8 chars, must contain lowercase,uppercase,number,special");
			// newpass_elt.reportValidity();
			cancel();
		} else {
			// newpass_elt.setCustomValidity("");
			// newpass_elt.reportValidity();
		}
		if (newpass !== confirmpass) {
			ui_msg = "Passwords must match!";
			// confirm_elt.setCustomValidity("Mismatch");
			// confirm_elt.reportValidity();
			cancel();
		} else {
			// confirm_elt.setCustomValidity("");
			// confirm_elt.reportValidity();
		}
		thinking = true;
		return async ({result, update}) => {
			thinking = false;
			ui_msg = "Success!";
			await applyAction(result);
		}
	}
</script>

<header>
<strong>All Inputs are required!</strong>
</header>
<br />
<form method="POST" use:enhance={enhcFunc}>
	{#if ui_msg}<h1>{ui_msg}</h1>{/if}
	{#if thinking}<h1>Thinking about it...</h1>{/if}
	{#if form?.error}<h1 transition:slide>{form?.message}</h1>{/if}
	{#if form?.success}<h1>Success!</h1>{/if}
	<label>
		Enter current password:
		<input name="currpass" type="password" required autofocus />
	</label>
	<br />
	<br />
	<label>
		Enter new password:
		<input bind:value={newpass}
					 bind:this={newpass_elt}
					 required
					 name="newpass" type="password"
					 title="Password: 8 chars, must contain lowercase,uppercase,number,special"
					 minlength="8"
					 />
	</label>

		<br />
		<br />
		<label>
			Enter new password again:
			<input bind:this={confirm_elt}
						 bind:value={confirmpass} name="newpass2" type="password"
						 minlength="8" required />
		</label>

		<br />
		<br />
		<button type="submit"> Submit </button>
	{#if form?.success}
		{form?.message}
	{/if}
</form>
