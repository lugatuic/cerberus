<script lang="ts">
	export let data: any;
</script>

<!-- TODO stick this in a for loop! -->
<ul>
	<li>CN: {data?.cn}</li>
	<li>DN: {data?.distinguishedName}</li>
	<li>Desc: {data?.desc}</li>
	<li>Groups: {data?.memberOf}</li>
	<li>Bad Password Time: {data?.badPasswordtime}</li>
	<li>Last Logon: {data?.lastlogon}</li>
</ul>
