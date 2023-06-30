<script>
	export let data;

	import { page } from '$app/stores';

	console.log(data.profileData);
</script>

<div class="flex justify-center text-white_warm">
	<h1>{data.profileData.name}</h1>
</div>
