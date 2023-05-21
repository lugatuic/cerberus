<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	function delCookie(e) {
		// Thanks Stackoverflow!
		document.cookie = 'cerberus' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		invalidateAll();
		console.log('del');
	}
</script>

<svelte:head>
	<!-- Temporary prettiness -->
	<!-- <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" /> -->
</svelte:head>

<main>
	<nav>
		{#if $page.data?.user}
			Currently logged in as {$page.data.user}
			<a rel="external" href="/" on:click|preventDefault={delCookie}>Logout</a>
		{:else}
			Not logged in!
		{/if}
		<!-- This <a> gaslit me for way too long --->
	</nav>

	<!-- Slot means the component/page.svelte that needs to be shown -->
	<slot />

	<footer>
		Member Area:
		<a href="/member">Member</a>
		<a href="/member/chpasswd">Chpasswd</a>
	</footer>
</main>

