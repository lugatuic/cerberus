<script lang="ts">
	import { page } from '$app/stores';
	import {invalidateAll} from '$app/navigation';

	export const ssr = false;

	function delCookie(e) {
		// Thanks Stackoverflow!
		document.cookie = "cerberus" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		invalidateAll();
		console.log("del");
	}

</script>

<svelte:head>
	<!-- Temporary prettiness -->
	<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
</svelte:head>

<header>
	Currently logged in as {$page.data.user}
	<a data-sveltekit-reload on:click|preventDefault={delCookie}>Logout</a>
	<!-- This <a> gaslit me for way too long --->
</header>

<slot />
