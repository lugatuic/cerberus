<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction, deserialize } from '$app/forms';
	import {slide} from 'svelte/transition';
  import { page } from '$app/stores';
	export let org;

	org = 'ACM';
	export let form: ActionData;

	export let data: PageData;

	let my_error = false;
	let my_success = false;
	let my_error_message = '';
	let is_processing = false;
	let formSuccess = 0;

	function handleClick() {
		console.log('Invalidating!');
		invalidateAll();
	}
	function enhanceFunc (my_form) {
		my_error = false;
		my_success = false;
		is_processing = true;
		return async ({result, update}) => {
			is_processing = false;
			if (result.type === 'failure') {
				my_error = true;
				my_error_message = result.data.my_message;
			} else {
				my_success = true;
			}
			await applyAction(result);
			update();
		}
	}
</script>

<h1>Login to {org}!</h1>

<form
	method="POST"
	action="/login"
	on:submit={handleClick}
	use:enhance={enhanceFunc}>
	{#if is_processing}<h1 transition:slide>Thinking about it...</h1> {/if}
	{#if my_error}
		<div transition:slide>
			<h1>Error</h1>
			<p>{my_error_message}
		</div>
	{/if}
	{#if my_success}<h1 transition:slide>Success!</h1>{/if}
	<label for="username">
		Username:
		<input placeholder="user@acmuic.org"id="username" name="username" type="email" required />
	</label>
	<br />
	<br />
	<label for="password">
		Password:
		<input id="password" name="password" type="password" required />
	</label>
	<button type="submit">Submit</button>
</form>
