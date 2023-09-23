<script lang="ts">
	import { PUBLIC_CDN_RES_API_URL } from '$env/static/public';
	import { Scroll } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import BaseCard from '$components/BaseCard.svelte';
	import type { SeriesData, SelectedSeries, SeriesSummary } from '$types';

	export let seriesData: SeriesData;
	export let selectedSeries: SelectedSeries;
	export let resetLazyScroll: () => void;

	let showCard = false;

	function handleChangeSeries(series: SelectedSeries) {
		selectedSeries = series;
		resetLazyScroll();
	}

	const isSelectedSeriesSummary = (item: SelectedSeries): item is SeriesSummary => {
		return typeof item !== 'string'; // 'Show All' is a string
	};

	$: if (isSelectedSeriesSummary(selectedSeries)) {
		const seriesName = selectedSeries.name;
		selectedSeries = seriesData.series.find((s) => s.name === seriesName) || selectedSeries;
	}
</script>

<BaseCard label="Search player" title="Search Player">
	<div slot="icon">
		<Scroll class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content">
		<div class="flex flex-col">
			<button
				class="flex items-center justify-between border-b-2 border-galaxy_purple-600 px-5 py-2 text-sm font-bold hover:bg-galaxy_purple-700 md:text-base"
				class:bg-galaxy_purple-700={selectedSeries === 'Show All'}
				on:click={() => handleChangeSeries('Show All')}
			>
				<div class="flex items-center justify-center space-x-3">
					<div class="h-2 w-2 rounded-full bg-galaxy_purple-650" class:bg-neon_green={selectedSeries === 'Show All'}></div>
					<p>Show All</p>
				</div>
				<div class="flex h-6 w-24 items-center justify-center rounded-full bg-galaxy_purple-300">
					{#key seriesData.current_achievement_count}
						<p class="text-xs font-extrabold text-galaxy_purple-750 md:text-sm">
							<span in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{seriesData.current_achievement_count}</span>
							/ {seriesData.total_achievement_count}
						</p>
					{/key}
				</div>
			</button>

			{#each seriesData.series as series}
				<button
					class="flex items-center justify-between space-x-2 border-b-2 border-galaxy_purple-600 px-5 py-2 text-left text-sm font-bold hover:bg-galaxy_purple-700 md:text-base"
					class:bg-galaxy_purple-700={isSelectedSeriesSummary(selectedSeries) && selectedSeries.name === series.name}
					on:click={() => handleChangeSeries(series)}
				>
					<div class="flex items-center justify-center space-x-3">
						<div
							class="h-2 w-2 rounded-full bg-galaxy_purple-700"
							class:bg-neon_green={isSelectedSeriesSummary(selectedSeries) && selectedSeries.name === series.name}
						></div>
						<p>{series.name}</p>
					</div>
					<div class="flex h-6 w-24 shrink-0 items-center justify-center rounded-full bg-galaxy_purple-300">
						{#key series.current_achievement_count}
							<p class="text-xs font-extrabold text-galaxy_purple-750 md:text-sm">
								<span in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{series.current_achievement_count}</span>
								/ {series.total_achievement_count}
							</p>
						{/key}
					</div>
				</button>
			{/each}

			<div class="flex items-center justify-between px-6 py-2 text-sm">
				<div class="flex items-center space-x-1">
					{#if selectedSeries !== 'Show All'}
						{#key selectedSeries.current_jade_count}
							<p class="font-medium">
								<span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>
									{selectedSeries.current_jade_count}</span
								>
								/ {selectedSeries.total_jade_count}
							</p>
						{/key}
						<img class="h-4 w-4" src={`${PUBLIC_CDN_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
						<p>Series</p>
					{/if}
				</div>
				<div class="flex items-center space-x-1">
					{#key seriesData.current_jade_count}
						<p class="font-medium">
							<span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>
								{seriesData.current_jade_count}</span
							>
							/ {seriesData.total_jade_count}
						</p>
					{/key}
					<img class="h-4 w-4" src={`${PUBLIC_CDN_RES_API_URL}/img/jade-currency-small.webp`} alt="Jade Icon" />
					<p>Total</p>
				</div>
			</div>
		</div>
	</div>
</BaseCard>
