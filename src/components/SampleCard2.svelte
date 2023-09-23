<script lang="ts">
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = true;
</script>

<div
class="rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-650
transition-all duration-300 overflow-clip hover:bg-galaxy_purple-650/95 hover:border-galaxy_purple-600 sm:hover:translate-y-1"
>
	<!-- Card Title -->
	<button class="w-full bg-galaxy_purple-700" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} sample card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<Search class="h-5 w-5 text-off_white" />
				<p class="text-xl font-bold">Search Player</p>
			</div>

			{#if showCard}
				<ChevronUp class="h-6 w-6 text-off_white" />
			{:else}
				<ChevronDown class="h-6 w-6 text-off_white" />
			{/if}
		</div>
	</button>
	<!-- Card Content-->
	{#if showCard}
		<div class="flex items-center justify-center px-6 pb-3 pt-2" transition:slide={{ duration: 300, easing: cubicInOut }} />
	{/if}
</div>
