<script lang="ts">
	import ProfileCard from './ProfileCard.svelte';
	import CharactersCard from './CharactersCard.svelte';

	export let data;
	const playerData = data.playerData;
	const charactersData = data.charactersData;
</script>

<svelte:head>
	<title>{playerData.nickname} HSR Profile - StarDB.gg</title>
	<meta
		name="description"
		content="Player profile of {playerData.nickname} for Honkai: Star Rail. View their player ranking and unit builds."
	/>
</svelte:head>

<div class="flex justify-center text-off_white">
	<h1>{playerData.nickname}</h1>

	<ProfileCard {playerData} />
</div>
