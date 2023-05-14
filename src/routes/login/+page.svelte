<script lang="ts">
	import type {PageData} from './$types';
	export let org;

	org = 'ACM';
	export let form: ActionData;
	
	export let data: PageData;
</script>

<!-- TODO: Make this pretty and usable -->
<main>
	<header>
		Currently logged in as {data?.user}
	</header>
	<h1>
		Welcome to {org}!
	</h1>

	<form method="POST" action="/login">
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
