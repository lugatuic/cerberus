<script lang="ts">
	export let org;

	export let form: ActionData;
</script>

<main>
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
