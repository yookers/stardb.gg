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

<div class="flex h-full flex-col items-center justify-center space-x-8 space-y-8 text-off_white md:flex-row md:space-y-0">
	<p class="text-7xl font-bold md:text-9xl">WIP.</p>
	<img src="/images/march-happy-small.webp" alt="" class="h-40 w-40" />
</div>
