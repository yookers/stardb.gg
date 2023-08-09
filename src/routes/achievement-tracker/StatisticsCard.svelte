<script lang="ts">
	import { PUBLIC_RES_API_URL } from '$env/static/public';
	import { LineChart, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { SeriesData } from '$types';

	export let seriesData: SeriesData;
	let showCard = false;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-600 bg-galaxy_purple-650 pt-3
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-650/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<LineChart class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Statistics</p>
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
			class="flex items-center justify-center px-6 pb-3 pt-2"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div class="flex flex-col justify-center items-center">
				<div class="flex justify-center items-center space-x-2">
					{#key seriesData.current_jade_count}
						<p class="font-bold text-3xl md:text-4xl">
							<span class="text-galaxy_purple-300" in:fly={{ y: -20, duration: 300 }}
								>{seriesData.current_jade_count}</span
							> <span class="text-2xl md:text-3xl">/ {seriesData.total_jade_count}</span>
						</p>
					{/key}
					<img
						class="h-6 w-6 md:h-8 md:w-8 mt-1 md:mt-2"
						src={`${PUBLIC_RES_API_URL}/img/jade-currency-small.webp`}
						alt="Jade Icon"
					/>
				</div>
				<p class="text-base font-bold">
					<span class="text-galaxy_purple-300">Jades</span> Obtained
				</p>
			</div>
		</div>
	{/if}
</div>
