<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	export let org;

	org = 'ACM';
	export let form: ActionData;

	export let data: PageData;

	function handleClick() {
		console.log('Invalidating!');
		invalidateAll();
	}
</script>

<!-- TODO: Make this pretty and usable -->
<h1>Login to {org}!</h1>

<form method="POST" action="/login" on:submit={handleClick} use:enhance>
	{#if form?.error}
		<h1>ERROR!</h1>
		<p>{form?.message}</p>
	{/if}
	{#if form?.success}
		<h1>Success!</h1>
	{/if}
	<label for="username">
		Username:
		<input placeholder="user@acmuic.org"id="username" name="username" type="email" required />
	</label>
	<br />
	<br />
	<label for="password">
		Password:
		<input id="password" name="password" type="password" required />
	</label>
	<button type="submit">Submit</button>
</form>
