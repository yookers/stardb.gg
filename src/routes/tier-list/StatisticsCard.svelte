<script lang="ts">
	import { LineChart, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let totalVotes: number;
	let showCard = false;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-600 bg-galaxy_purple-650
    transition-all duration-300 hover:bg-galaxy_purple-650/95 sm:hover:scale-102"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} Statistics card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
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
		<div class="flex items-center justify-center px-6 pb-3 pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<div class="flex flex-col items-center justify-center font-bold">
				<p class="pb-1 text-6xl text-galaxy_purple-350 md:text-7xl">{totalVotes}</p>
				<p class="line-clamp-1 text-xl font-medium">
					<span class="font-bold text-galaxy_purple-350">Total</span> voters
				</p>
			</div>
		</div>
	{/if}
</div>
