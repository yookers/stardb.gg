<script lang="ts">
	import { Scroll, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { SeriesData, SelectedSeries, SeriesSummary } from '$types';

	export let seriesData: SeriesData;
	export let selectedSeries: SelectedSeries;
	export let resetLazyScroll: () => void;

	let showCard = true;

	const isSelectedSeriesSummary = (item: SelectedSeries): item is SeriesSummary => {
		return typeof item !== 'string'; // 'Show All' is a string
	};

	$: if (selectedSeries) {
		resetLazyScroll();
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-550 bg-galaxy_purple-600 pt-3
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-600/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<Scroll class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Series</p>
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
			class="flex flex-col justify-center pt-2 pb-3"
			transition:slide={{ duration: 350, easing: cubicInOut }}
		>
			<div class="flex flex-col">
				<button
					class="font-bold text-sm md:text-base items-center py-2 px-5 flex justify-between hover:bg-galaxy_purple-700"
					class:bg-galaxy_purple-700={selectedSeries === 'Show All'}
					on:click={() => (selectedSeries = 'Show All')}
				>
					<div class="flex justify-center items-center space-x-3">
						<div
							class="w-2 h-2 rounded-full bg-galaxy_purple-650"
							class:bg-neon_green={selectedSeries === 'Show All'}
						></div>
						<p>Show All</p>
					</div>
					<div class="flex rounded-full bg-galaxy_purple-300 items-center justify-center w-24 h-6">
						{#key seriesData.current_achievement_count}
							<p class="text-xs md:text-sm font-extrabold text-galaxy_purple-750">
								<span in:fly={{ y: -20, duration: 300, easing: cubicInOut }}
									>{seriesData.current_achievement_count}</span
								>
								/ {seriesData.total_achievement_count}
							</p>
						{/key}
					</div>
				</button>

				{#each seriesData.series as series}
					<button
						class="font-bold text-sm items-center md:text-base py-2 px-5 flex border-t-2 border-galaxy_purple-550/70 justify-between text-left hover:bg-galaxy_purple-700"
						class:bg-galaxy_purple-700={isSelectedSeriesSummary(selectedSeries) &&
							selectedSeries.name === series.name}
						on:click={() => (selectedSeries = series)}
					>
						<div class="flex justify-center items-center space-x-3">
							<div
								class="w-2 h-2 rounded-full bg-galaxy_purple-650"
								class:bg-neon_green={isSelectedSeriesSummary(selectedSeries) &&
									selectedSeries.name === series.name}
							></div>
							<p>{series.name}</p>
						</div>
						<div
							class="flex rounded-full bg-galaxy_purple-300 items-center justify-center w-24 h-6"
						>
							{#key series.current_achievement_count}
								<p class="text-xs font-extrabold md:text-sm text-galaxy_purple-750">
									<span in:fly={{ y: -20, duration: 400, easing: cubicInOut }}
										>{series.current_achievement_count}</span
									>
									/ {series.total_achievement_count}
								</p>
							{/key}
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
