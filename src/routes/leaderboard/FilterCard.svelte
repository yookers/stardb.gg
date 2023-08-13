<script lang="ts">
	import { ListFilter, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let regionFilter: string;
	export let rankingFilter: string;
	export let setRegion: (region: string) => void;
	export let setRanking: (ranking: string) => void;
	export let queryCount: number;
	export let displayStart: number;
    export let displayEnd: number;

	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-700 pt-3 transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-700/95"
>
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<ListFilter class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Filter</p>
			</div>
			{#if showCard}
				<ChevronUp class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{:else}
				<ChevronDown class="h-6 w-6 text-off_white lg:h-7 lg:w-7" />
			{/if}
		</div>
	</button>

	{#if showCard}
		<div class="select-none overflow-auto pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<div class="flex flex-col space-y-3 px-5 pb-3 text-base md:flex-row md:justify-between md:space-y-0 lg:text-lg">
				<div class="flex space-x-2">
					<button
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-galaxy_purple-400 font-extrabold text-galaxy_purple-400 hover:bg-galaxy_purple-400 hover:text-space_dark md:w-20"
						class:bg-galaxy_purple-400={regionFilter === 'all'}
						class:bg-galaxy_purple-750={regionFilter !== 'all'}
						class:text-space_dark={regionFilter === 'all'}
						aria-label="Filter by ALL regions"
						on:click={() => setRegion('all')}
					>
						<p>ALL</p>
					</button>
					<button
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_yellow bg-galaxy_purple-750 font-extrabold text-neon_yellow hover:bg-neon_yellow hover:text-space_dark md:w-20"
						class:bg-neon_yellow={regionFilter === 'na'}
						class:text-space_dark={regionFilter === 'na'}
						aria-label="Filter by NA region"
						on:click={() => setRegion('na')}
					>
						<p>NA</p>
					</button>
					<button
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_pink bg-galaxy_purple-750 font-extrabold text-neon_pink hover:bg-neon_pink hover:text-space_dark md:w-20"
						class:bg-neon_pink={regionFilter === 'eu'}
						class:text-space_dark={regionFilter === 'eu'}
						aria-label="Filter by EU region"
						on:click={() => setRegion('eu')}
					>
						<p>EU</p>
					</button>
					<button
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_green bg-galaxy_purple-750 font-extrabold text-neon_green hover:bg-neon_green hover:text-space_dark md:w-20"
						class:bg-neon_green={regionFilter === 'asia'}
						class:text-space_dark={regionFilter === 'asia'}
						aria-label="Filter by ASIA region"
						on:click={() => setRegion('asia')}
					>
						<p>ASIA</p>
					</button>
					<button
						class="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-neon_blue bg-galaxy_purple-750 font-extrabold text-neon_blue hover:bg-neon_blue hover:text-space_dark md:w-20"
						class:bg-neon_blue={regionFilter === 'cn'}
						class:text-space_dark={regionFilter === 'cn'}
						aria-label="Filter by CN region"
						on:click={() => setRegion('cn')}
					>
						<p>CN</p>
					</button>
				</div>
				<div
					class="relative flex h-10 w-40 select-none items-center rounded-full bg-galaxy_purple-200 text-sm font-bold text-galaxy_purple-700"
				>
					<button class="h-full w-20 px-4" aria-label="Set Search Type to World" on:click={() => setRanking('World')}
						>World</button
					>
					<button class="h-full w-20 px-4" aria-label="Set Search Type to Region" on:click={() => setRanking('Region')}
						>Region</button
					>
					<span
						class="absolute flex h-8 w-20 items-center justify-center rounded-full bg-galaxy_purple-700 text-galaxy_purple-200 duration-300
                        {rankingFilter === 'World' ? 'left-1' : 'left-[calc(50%-4px)]'}"
					>
						{rankingFilter}
					</span>
				</div>
			</div>
			<div class="border-t-2 border-galaxy_purple-650/95">
				{#key queryCount}
					<p class="px-6 py-2 text-sm">
						Filtering <span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{displayStart} <span class="font-normal">-</span> {displayEnd} <span class="font-normal">of</span> {queryCount}</span> Players
					</p>
				{/key}
			</div>
		</div>
	{/if}
</div>
