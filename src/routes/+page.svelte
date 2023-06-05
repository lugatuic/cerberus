<script>
	import Login from './login/+page.svelte';
	import {slide} from 'svelte/transition';
</script>

<h1 out:slide>Welcome to Cerberus: The LDAP Guardian</h1>

<Login org="ACM" />
