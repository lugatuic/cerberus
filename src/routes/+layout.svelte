<script lang="ts">
	import {page} from '$app/stores';
</script>
<svelte:head>
	<!-- Temporary prettiness -->
	<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
</svelte:head>

<header>
	Currently logged in as {$page.data.user}
</header>

<slot />
