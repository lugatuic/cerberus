<script lang="ts">
	export let data: any;
</script>

<ul>
	<li>CN: {data?.cn}</li>
	<li>Desc: {data?.desc}</li>
	<li>Groups: {data?.memberOf}</li>
	<li>Bad Password Time: {data?.badPasswordtime}</li>
	<li>Last Logon: {data?.lastlogon}</li>
</ul>
