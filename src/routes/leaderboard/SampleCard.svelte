<script>
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 pt-3
    transition-all duration-300 hover:scale-103 hover:bg-galaxy_purple-550/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<Search class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Search Player</p>
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
		/>
	{/if}
</div>
