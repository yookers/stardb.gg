<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let label: string;
	export let title: string;
	let showCard = true;
</script>

<div
	class="overflow-hidden rounded-xl border-2 border-galaxy_purple-600
    bg-galaxy_purple-650 transition-all duration-300 hover:border-galaxy_purple-550 hover:bg-galaxy_purple-650/95 sm:hover:translate-y-1"
>
	<!-- Card Title -->
	<button
		class="w-full bg-galaxy_purple-700"
		on:click={() => (showCard = !showCard)}
		aria-label="{showCard ? 'Hide' : 'Show'} {label} card"
	>
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<slot name="icon" />
				<p class="text-xl font-bold">{title}</p>
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
		<div class="flex flex-col overflow-auto" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<slot name="content" />
		</div>
	{/if}
</div>
