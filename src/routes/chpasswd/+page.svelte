<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	Hello, {data?.user}!

	<form action="/chpasswd">
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
</main>
