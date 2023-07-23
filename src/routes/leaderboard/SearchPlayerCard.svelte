<script>
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	let showCard = true;
	let searchType = 'Name'; // 'Name' or 'UID'
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 pt-3
    transition-all duration-300 hover:translate-y-0.5 hover:bg-galaxy_purple-550/95"
>
	<div class="flex items-center justify-between px-5 pb-3">
		<div class="flex items-center space-x-4">
			<Search class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
			<p class="text-xl font-bold lg:text-2xl">Search Player</p>
		</div>
		<button on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
			{#if showCard}
				<ChevronUp class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{:else}
				<ChevronDown class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{/if}
		</button>
	</div>
	{#if showCard}
		<div
			class="flex space-x-4 overflow-auto px-6 pb-3 pt-2 text-sm"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div
				class="relative flex h-10 w-32 select-none items-center rounded-full bg-galaxy_purple-650 text-center font-bold"
			>
				<button
					class="h-full w-16 px-4"
					aria-label="Set Search Type to Name"
					on:click={() => (searchType = 'Name')}>Name</button
				>
				<button
					class="h-full w-16 px-4"
					aria-label="Set Search Type to UID"
					on:click={() => (searchType = 'UID')}>UID</button
				>
				<span
					class="absolute flex h-8 w-16 items-center justify-center rounded-full bg-galaxy_purple-400 text-galaxy_purple-650 duration-300"
					style="left: {searchType === 'Name' ? '4px' : 'calc(50% - 4px)'}"
				>
					{searchType}
				</span>
			</div>

			<input
				class="h-10 w-full rounded-full font-bold border-2 placeholder:font-normal border-transparent bg-galaxy_purple-650 px-4 text-sm outline-none placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-400 sm:text-base"
				type="text"
				placeholder="Search {searchType} ..."
			/>
		</div>
	{/if}
</div>
