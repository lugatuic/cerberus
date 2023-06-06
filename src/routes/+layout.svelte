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

<nav>
	{#if $page.data?.user}
		<a href="/member">User: {$page.data.user}</a>
		<a href="/">Home</a>
		<a href="/member/chpasswd">Chpasswd</a>
		<a rel="external" href="/" on:click|preventDefault={delCookie}>Logout</a>
		<!-- This <a> gaslit me for way too long --->
	{:else}
		Not logged in!
		<a href="/login">Log In</a>
	{/if}
</nav>

<!-- Slot means the component/page.svelte that needs to be shown -->
<main>
	<slot />
</main>

<footer>Copyright LOLOL</footer>
