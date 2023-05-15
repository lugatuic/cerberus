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
<main>
	<h1>
		Welcome to {org}!
	</h1>

	<form method="POST" action="/login" on:submit={handleClick} use:enhance>
		{#if form?.error}
			<h1>ERROR!</h1>
		{/if}
		{#if form?.success}
			<h1>Success!</h1>
		{/if}
		<label>
			Username:
			<input name="username" type="text" />
		</label>

		<label>
			Password:
			<input name="password" type="password" />
		</label>
		<button type="submit">Submit</button>
	</form>
</main>
