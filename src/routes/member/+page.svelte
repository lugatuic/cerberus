<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<svelte:head>
	<title> Welcome {data?.user}! </title>
</svelte:head>

<main>
	You are currently {data?.user}
</main>

<p>
Show member-specific or member-only information here.
</p>
