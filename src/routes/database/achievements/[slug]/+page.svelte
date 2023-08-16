<script lang="ts">
	import Information from './InformationCard.svelte';
	import MetadataCard from './MetadataCard.svelte';
	import type { Achievement } from '$types';

	export let data;
	const achievementData: Achievement = data.achievementData;
</script>

<svelte:head>
	<title>How to Get {achievementData.name} - Database - StarDB.GG</title>
	<meta
		name="description"
		content="Full guides, cultural references, and videos on how to obtain {achievementData.name} from the category {achievementData.series_name} in Honkai: Star Rail. StarDB.GG is the best site for achievement hunters."
	/>
</svelte:head>

<main class="flex h-full w-full justify-center px-4 text-off_white sm:px-6 lg:px-24">
	<div class="flex w-full flex-col py-2 md:w-[600px]">
		<p class="text-sm">Database > Achievement > <span class="font-bold">{achievementData.id}</span></p>
		<div class="pb-3 pt-6">
			<h1 class="text-xl font-bold md:text-3xl">{achievementData.name}</h1>
			<h2 class="text-galaxy_purple-150">{achievementData.series_name}</h2>
		</div>
		<div class="flex flex-col space-y-4 sm:space-y-6">
			<Information {achievementData} />
			<MetadataCard {achievementData} />
		</div>
	</div>
</main>
