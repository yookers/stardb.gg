<script>
	export let data;
    const upperCaseRegion = data.profileData.region.toUpperCase();
</script>

<svelte:head>
	<title>{data.profileData.name} HSR Profile ({upperCaseRegion}) - StarDB.gg</title>
	<meta name="description" content="Player profile of {data.profileData.name} ({upperCaseRegion}) for Honkai Star Rail. View their player ranking and unit builds." />
</svelte:head>

<div class="flex justify-center text-white_warm">
	<h1>{data.profileData.name}</h1>
</div>
