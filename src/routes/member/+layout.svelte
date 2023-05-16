<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Welcome {data.user}!</title>
</svelte:head>

<aside>
	You are currently {data?.user}
</aside>

<slot />
