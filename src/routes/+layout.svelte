<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';

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
		<div transition:fade>
			<a href="/member">User: {$page.data.user}</a>
			<a href="/">Home</a>
			<a href="/member/chpasswd">Chpasswd</a>
			<a rel="external" href="/" on:click|preventDefault={delCookie}>Logout</a>
		</div>
		<!-- This <a> gaslit me for way too long --->
	{:else}
		<div transition:fade>
			Not logged in!
			<a href="/login">Log In</a>
			<a href="/register">Register</a>
		</div>
	{/if}
</nav>

<!-- Slot means the component/page.svelte that needs to be shown -->
<main>
	<slot />
</main>

<footer>Copyright LOLOL</footer>

<style>
	footer {
		left: 0;
		bottom: 0;
		margin-top: 2em;
	}

	nav {
		padding-top: 0.5em;
		padding-bottom: 2em;
	}
	a {
		text-decoration: none;
		padding: auto 0.5em;
		/* background-color: blanchedalmond; */
		background-color: var(--primary-button);
	}
	a:hover,
	a:focus {
		text-decoration: underline;
		background-color: var(--secondary-button);
	}

	:global(input) {
		border-style: solid;
	}
	:global(input:valid) {
		border-color: var(--background);
	}

	:global(input:invalid) {
		border-color: var(--accent);
	}

	:global(input:optional) {
		border: 2px dashed var(--accent);
	}
	:global(body) {
		background-color: var(--background);
		color: var(--text);
		font-family: 'Comic Mono';
	}
</style>
