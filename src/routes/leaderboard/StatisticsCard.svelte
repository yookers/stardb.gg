<script lang="ts">
	import { LineChart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = false;
	export let statisticsData: any[];

	// Statistics carousel
	let index = 0;

	function nextCard() {
		if (index < statisticsData.length - 1) index++;
		else index = 0;
	}

	function prevCard() {
		if (index > 0) index--;
		else index = statisticsData.length - 1;
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-600 bg-galaxy_purple-650
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-650/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} Statistics card">
		<div class="flex items-center justify-between px-5 py-2 sm:py-3">
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
	{#if showCard && statisticsData}
		<div class="flex items-center justify-center px-5 pb-3 pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<div class="relative flex w-full items-center justify-center rounded-xl">
				<button class="absolute left-10 flex h-10 w-10 items-center justify-center" on:click={prevCard}>
					<ChevronLeft class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
				</button>

				<div
					class="flex flex-col text-center font-bold"
					class:text-galaxy_purple-350={statisticsData[index].region === 'Total'}
					class:text-neon_yellow={statisticsData[index].region === 'NA'}
					class:text-neon_pink={statisticsData[index].region === 'EU'}
					class:text-neon_green={statisticsData[index].region === 'ASIA'}
					class:text-neon_blue={statisticsData[index].region === 'CN'}
				>
					{#key statisticsData[index].region}
						<p class="pb-1 text-6xl md:text-7xl" in:fly={{ y: 10, duration: 300, easing: cubicInOut }}>
							{statisticsData[index].count}
						</p>
					{/key}
					<p class="line-clamp-1 text-xl">
						{statisticsData[index].region} <span class="font-medium text-off_white">players</span>
					</p>
				</div>

				<button class="absolute right-10 flex h-10 w-10 items-center justify-center" on:click={nextCard}>
					<ChevronRight class="h-6 w-6 text-off_white lg:h-8 lg:w-8" />
				</button>
			</div>
		</div>
	{/if}
</div>
