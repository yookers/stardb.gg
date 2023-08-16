<script lang="ts">
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let searchQuery = '';
	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-550/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4 overflow-hidden">
				<Search class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="truncate text-xl font-bold lg:text-2xl">Search Achievement</p>
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
			<div class="flex w-full flex-col">
				<div class="flex">
					<input
						class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-650 px-4 text-sm font-bold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-400 sm:text-base"
						type="text"
						bind:value={searchQuery}
						placeholder="Search Achievement ..."
					/>
					<button
						class="rounded-r-full bg-galaxy_purple-300 px-3 text-galaxy_purple-700 hover:scale-105 hover:bg-galaxy_purple-350 hover:text-galaxy_purple-750"
						aria-label="Search for Achievement"
					>
						<Search class="h-5 w-5 lg:h-6 lg:w-6" />
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
