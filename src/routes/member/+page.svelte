<script lang="ts">
	export let data: any;
</script>

<p>
CN: {data?.cn}
Desc: {data?.desc}
Groups: {data?.memberOf}
Password Expiry: {data?.badPasswordtime}
</p>
