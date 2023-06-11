<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { slide } from 'svelte/transition';
	import {browser} from '$app/environment';
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';
 
	let { page } = getStores();
	let data;
	let form;
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
		if (!cl_discord_code) {
			ui_msg = "Make sure the discord code is in the URL!";
			cancel();
		}
		return async ({ result, update }) => {
			await applyAction(result);
			update();
		};
	}
	let discord_url = "https://discord.com/api/oauth2/authorize?client_id=1115994148206542909&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister&response_type=code&scope=identify%20email%20guilds";
	// let fragments = '';
	// let discordInput;
	let discordInput2;
	// onMount(() => {
	// 	fragments = encodeURIComponent(window.location.hash);
	// 	discordInput.value = window.location.hash;
	// });
	let cl_discord_code;
	$: cl_discord_code = $page.url.searchParams.get("code");
</script>

<!-- TODO: Add placeholders and title attributes -->
<div transition:slide>
	<header>
		<h1>Register</h1>
		<!-- <h1>Fragments: {fragments}</h1> -->
		<h1>Code: {cl_discord_code ?? "Please click the discord link"}</h1>
		{#if form?.message}<h2 transition:slide>{form?.message}</h2>{/if}
	</header>
	<form id="regform" method="POST" use:enhance={myEnhance}>
		{#if ui_msg}<h1>{ui_msg}</h1>{/if}
	</form>
	<a href={discord_url} rel="external">Discord</a>
	<input bind:this={discordInput2} bind:value={cl_discord_code}
				 type="hidden" name="discord_code" form="regform" />
	<table role="presentation">
		<tr>
			<td>NetID (new Username):</td>
			<td><input form="regform" name="username" type="text" 
								 pattern="[a-z]+[0-9]+" /></td>
		</tr>
		<tr>
			<td>Create a new Password:</td>
			<td><input form="regform" name="password" type="password"  /></td>
		</tr>
		<tr>
			<td>Re-enter new Password:</td>
			<td><input form="regform" name="password2" type="password"  /></td>
		</tr>
		<tr>
			<td>UIN:</td>
			<td><input form="regform" name="uin" type="tel" pattern="[0-9]+"  /></td>
		</tr>
		<tr>
			<td>Email:</td>
			<td><input form="regform" name="email" type="email"  /></td>
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
