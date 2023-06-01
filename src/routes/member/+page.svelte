<script lang="ts">
	export let data: any;

	let keys = Object.keys(data.info);
	let values = Object.values(data.info);
</script>

<table rules="all" border="1" align="left">
	<thead>
		<tr>
			{#each keys as col}
				<th>{col}</th>
			{/each}
		</tr>
	</thead>
	<hrule />
	<tbody>
	<tr>
		{#each values as value}
			<td>{value}</td>
		{/each}
	</tr>
	</tbody>
</table>

<style>
	table {
		width: 75%;
		font-family: sans-serif;
		margin: 0.5em;
	}

	td {
		padding: 5px;
	}
</style>
