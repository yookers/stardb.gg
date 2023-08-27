<script lang="ts">
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import Information from './InformationCard.svelte';
	import VideoCard from './VideoCard.svelte';
	import MetadataCard from './MetadataCard.svelte';
	import type { DatabaseAchievement } from '$types';

	export let data;
	const achievementData: DatabaseAchievement = data.achievementData;
</script>

<svelte:head>
	<title>How to Get {achievementData.name} - Honkai: Star Rail - Achievements - StarDB.GG</title>
	<meta
		name="description"
		content="Full guides, cultural references, and videos on how to obtain {achievementData.name} from the category {achievementData.series_name} in Honkai: Star Rail. StarDB.GG is the best site for achievement hunters."
	/>
	<link rel="canonical" href="https://stardb.gg/database/achievements/{achievementData.id}" />
</svelte:head>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-24 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<p class="pl-2 text-sm">Database > Achievement > <span class="font-bold">{achievementData.id}</span></p>
		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<!-- Image names are all lowercase, no special characters (including spaces) -->
			<img
				class="h-12 w-12 rounded-full border-2 border-off_white md:h-14 md:w-14"
				src="{PUBLIC_RES_API_URL}/img/achievement-icons/{achievementData.series_name
					.toLowerCase()
					.replace(/[^a-z0-9]/g, '')}.webp"
				alt="{achievementData.series_name} icon"
			/>
			<div class="">
				<h1 class="text-xl font-bold md:text-3xl">{achievementData.name}</h1>
				<h2 class="text-base text-galaxy_purple-150 md:text-lg">{achievementData.series_name}</h2>
			</div>
		</div>
		<div class="flex flex-col space-y-3 sm:space-y-4">
			<Information {achievementData} />
			{#if achievementData.video}
				<VideoCard videoURL={achievementData.video} />
			{/if}
			<MetadataCard {achievementData} />
		</div>
	</div>
</main>
