<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';

	let { page } = getStores();
	let data;
	let form;
	let form_msg;
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
		ui_msg = "Thinking about it...";
		// if (!cl_discord_code) {
		// 	ui_msg = 'Make sure the discord code is in the URL!';
		// 	cancel();
		// }
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				ui_msg = result.data.message;
			} else {
				ui_msg = "Form executed.";
			}
			await applyAction(result);
			update();
		};
	}
	let discord_url =
		'https://discord.com/api/oauth2/authorize?client_id=1115994148206542909&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister&response_type=code&scope=identify%20email%20guilds';
	if (import.meta.env.PROD) {
		discord_url='https://discord.com/api/oauth2/authorize?client_id=1115994148206542909&redirect_uri=https%3A%2F%2Fcerberus.acmuic.org%2Fregister&response_type=code&scope=identify%20email%20guilds';
	}
	// let fragments = '';
	// let discordInput;
	let discordInput2;
	// onMount(() => {
	// 	fragments = encodeURIComponent(window.location.hash);
	// 	discordInput.value = window.location.hash;
	// });
	let cl_discord_code;
	$: cl_discord_code = $page.url.searchParams.get('code');
	let manual = false;
</script>

<aside transition:slide>
<strong> Instructions </strong>
<p> Verification with Discord </p>
<ul>
<li> Click the discord button, sign in to discord</li>
<li> You will end up on the same page but with a code in the URL</li>
<li> Fill out the rest of the information and click submit</li>
<li>Your discord account must have 2FA, a verified email address and be in the ACM discord </li>
</ul>
<hr />
<p>Manual Verification</p>
<ul>
	<li>Contact an admin, give them your netID and receive a special code from them</li>
	<li>Choose the manual verification option and fill out the form</li>
	<li>Use the same NetID as what you told the admin</li>
	<li><strong>DO NOT share your special code with anyone!</li>
</ul>
<hr />
<p>
Boxes with a <em>solid</em> border are <u>REQUIRED</u>. <br />
Boxes with a <em>dashed</em> border are <u>OPTIONAL</u>. <br />
Boxes will loose their border once they have an acceptable value.<br />
Passwords <strong>MUST</strong>
contain <u>Uppercase</u>, <u>Lowercase</u>, <u>Digit</u>
and <u>Special Char</u>.
</p>
</aside>
<!-- TODO: Add placeholders and title attributes -->
<div id="form" transition:slide>
	<header>
		<h1>Register: Read Instructions --></h1>
		<!-- <h1>Fragments: {fragments}</h1> -->
	</header>
	<section>
		<h1>Step 1: Choose Verification Method</h1>
		{#if form?.message}<h2 transition:slide>{form?.message}</h2>{/if}
		<button type="button"><a class="btn" href={discord_url} rel="external">Discord</a></button>
		<input class="ibutton" type="button" on:click={() => (manual = !manual)} value="Manual Verification" />
		{#if ui_msg}<h2 transition:slide>{ui_msg}</h2>{/if}
	</section>
	<form id="regform" method="POST" use:enhance={myEnhance} />
	{#if cl_discord_code || manual}
		<section>
			<hr />
			<h1>Step 2: Fill New User Details</h1>
			{#if form?.message}<h2>{form?.message}</h2>{/if}
			<table role="presentation" transition:slide>
				<tr>
					<td>NetID (new Username):</td>
					<td><input form="regform" name="username" type="text" pattern="[a-z]+[0-9]+" required /></td>
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
				{#if manual}
					<tr>
						<td> Verification Code:</td>
						<td><input minlength="40" maxlength="40" form="regform" name="verification" type="text" required /></td>
					</tr>
				{:else}
						<tr>
							<td>Discord Code:</td>
							<td><input
										id = 'rdonly'
										bind:this={discordInput2}
										bind:value={cl_discord_code}
										type="text"
										readonly
										name="discord_code"
										form="regform"
										/></td>
						</tr>
				{/if}
			</table>
		</section>
	{/if}
	{#if cl_discord_code && !manual}
		<button form="regform" formaction="?/discord" type="submit">Submit with Discord</button>
	{:else if manual}
		<button form="regform" formaction="?/manual">Submit with manual verification</button>
	{/if}

</div>



<style>
	aside {
		position: fixed;
		padding: 1em;
		border-style: solid;
		margin-left: 1em;
		top: 1em;
		left: 50%;
		max-width: 45%;
		min-width:30%;
	}
	#form {
		top: 2em;
		max-width: 50%;
	}
	#rdonly {
		border-style: none;
		background-color: #ccc;
	}
	a.btn {
		appearance: button;
		text-decoration: none;
		color: initial;
	}
	.ibutton, button {
		background-color: var(--primary-button);
		text: var(--text);
		border-style: solid;
		border-color: var(--accent);
	}
	.ibutton:hover, button:hover, .ibutton:focus, button:focus {
		border-style: groove;
	}
</style>
