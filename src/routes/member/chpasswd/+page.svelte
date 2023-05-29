<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	export let data: PageData;
	export let form: ActionData;
</script>

	Hello, {data?.user}!

	<form method="POST" action="/member/chpasswd" use:enhance>
		<label>
			Enter current password:
			<input id="currpass" type="password" />
		</label>

		<label>
			Enter new password:
			<input id="newpass" type="password" />
		</label>

		<label>
			Enter new password again:
			<input id="newpass2" type="password" />
		</label>

		<button type="submit"> Submit </button>
	</form>

	{#if form?.success}
		{form?.message}
	{/if}
