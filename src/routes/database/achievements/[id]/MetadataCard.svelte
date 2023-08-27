<script lang="ts">
	import { Braces, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { DatabaseAchievement } from '$types';

	export let achievementData: DatabaseAchievement;
	let showCard = false;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750
    transition-all duration-300 hover:bg-galaxy_purple-750/95 sm:hover:scale-102"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} Metadata card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<Braces class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Metadata</p>
			</div>

			{#if showCard}
				<ChevronUp class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{:else}
				<ChevronDown class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{/if}
		</div>
	</button>
	<!-- Card Content-->
	{#if showCard}
		<div
			class="flex flex-col items-center justify-center space-y-2 truncate px-12 pb-3 pt-2 text-sm font-bold md:text-base"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div class="flex w-full items-baseline justify-between">
				<p class="font-normal">ID</p>
				<div class="mx-3 w-full border border-dashed border-galaxy_purple-700"></div>
				<p>{achievementData.id}</p>
			</div>

			<div class="flex w-full items-baseline justify-between">
				<p class="font-normal">Version</p>
				<div class="mx-3 w-full border border-dashed border-galaxy_purple-700"></div>
				<p>{achievementData.version}</p>
			</div>

			<div class="flex w-full items-baseline justify-between">
				<p class="font-normal">Hidden</p>
				<div class="mx-3 w-full border border-dashed border-galaxy_purple-700"></div>
				<p>{achievementData.hidden ? 'Yes' : 'No'}</p>
			</div>

			<div class="flex w-full items-baseline justify-between">
				<p class="font-normal">Jade Value</p>
				<div class="mx-3 w-full border border-dashed border-galaxy_purple-700"></div>
				<p>{achievementData.jades}</p>
			</div>

			<div class="flex w-full items-baseline justify-between">
				<p class="font-normal">% Obtained</p>
				<div class="mx-3 w-full border border-dashed border-galaxy_purple-700"></div>
				<p>{(achievementData.percent * 100).toFixed(4)}%</p>
			</div>
		</div>
	{/if}
</div>
