<script lang="ts">
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import Information from './InformationCard.svelte';
	import VideoCard from './VideoCard.svelte';
	import MetadataCard from './MetadataCard.svelte';
	import type { DatabaseAchievement } from '$types';
	import { ArrowUpRight } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let data;
	const achievementData: DatabaseAchievement = data.achievementData;

	// TODO: Replace with regular 'goto' or 'href' once settings are stored in local storage
	function handleHistoryBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>How to Get {achievementData.name} - Honkai: Star Rail - Achievements - StarDB.GG</title>
	<meta
		name="description"
		content="Full guides, cultural references, and videos on how to obtain {achievementData.name} from the category {achievementData.series_name} in Honkai: Star Rail. StarDB.GG is the best site for achievement hunters."
	/>
	<link rel="canonical" href="https://stardb.gg/database/achievements/{achievementData.id}" />
</svelte:head>

<main class="flex h-full w-full justify-center px-2 pb-4 text-off_white sm:px-6 sm:pb-6 lg:px-20 xl:px-6">
	<div class="flex w-full flex-col py-2 md:w-main">
		<p class="pl-2 text-sm">
			Database / <button on:click={handleHistoryBack}>Achievement</button> / <span class="font-bold">{achievementData.id}</span>
		</p>

		<button
			class="group flex items-center pl-2 text-off_white hover:text-galaxy_purple-250"
			aria-label="Go back to achievement tracker page"
			on:click={handleHistoryBack}
		>
			<p>Return to Tracker</p>
			<ArrowUpRight class="h-6 w-6 group-hover:-translate-y-0.5" />
		</button>

		<div class="flex items-center space-x-3 pb-3 pl-2 pt-4 sm:pt-6 md:space-x-4">
			<!-- Image names are all lowercase, no special characters (including spaces) -->
			<img
				class="h-12 w-12 rounded-full border-2 border-off_white md:h-14 md:w-14"
				src="{PUBLIC_CDN_RES_API_URL}/img/series/{achievementData.series}.webp"
				alt="{achievementData.series_name} icon"
			/>
			<div class="pl-2">
				<h1 class="text-xl font-bold md:text-3xl"
                in:fly={{ y: 20, duration: 300, delay: 150, easing: cubicInOut }}>{achievementData.name}</h1>
				<h2 class="text-sm md:text-base"
                in:fly={{ y: 20, duration: 300, delay: 250, easing: cubicInOut }}>{achievementData.series_name}</h2>
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
