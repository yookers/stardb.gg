<script lang="ts">
	import { ArrowDownWideNarrow, ListFilter } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = true;
	export let bannerType: 'standard' | 'departure' | 'special' | 'lc' | 'all';
	export let warpType: 'light_cone' | 'character' | 'all';
	export let warpRarity: (3 | 4 | 5)[];
	export let sortOrder: 'ascending' | 'descending';
	export let displayStart: number;
	export let displayEnd: number;
	export let filterLength: number;

	function toggleSortOrder() {
		if (sortOrder === 'descending') {
			sortOrder = 'ascending';
		} else if (sortOrder === 'ascending') {
			sortOrder = 'descending';
		} else {
			sortOrder = 'descending';
		}
	}

	function changeWarpRarity(rarity: 3 | 4 | 5) {
		if (warpRarity.includes(rarity)) {
			warpRarity = warpRarity.filter((r) => r !== rarity);
		} else {
			warpRarity.push(rarity);
		}
		warpRarity = warpRarity;
	}
</script>

<BaseCard label="Filter" title="Filter">
	<div slot="icon">
		<ListFilter class="h-5 w-5 text-off_white" />
	</div>

	<div slot="content" class="pt-4">
		<div class="flex flex-col gap-y-2.5 px-5 pb-3 text-sm font-bold md:text-base">
			<div class="flex flex-wrap gap-x-2 gap-y-3 text-sm">
				<button
					class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                    {bannerType === 'all'
						? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
						: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300 hover:bg-galaxy_purple-300 hover:text-galaxy_purple-750'}"
					on:click={() => (bannerType = 'all')}
				>
					<p>All</p>
				</button>
				<button
					class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                {bannerType === 'standard'
						? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
						: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300 hover:bg-galaxy_purple-300 hover:text-galaxy_purple-750'}"
					on:click={() => (bannerType = 'standard')}
				>
					<p>Standard</p>
				</button>
				<button
					class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                {bannerType === 'departure'
						? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
						: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300 hover:bg-galaxy_purple-300 hover:text-galaxy_purple-750'}"
					on:click={() => (bannerType = 'departure')}
				>
					<p>Departure</p>
				</button>
				<button
					class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                {bannerType === 'special'
						? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
						: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300 hover:bg-galaxy_purple-300 hover:text-galaxy_purple-750'}"
					on:click={() => (bannerType = 'special')}
				>
					<p>Special</p>
				</button>
				<button
					class="h-8 w-24 flex-shrink-0 items-center justify-center rounded-full border-2
                {bannerType === 'lc'
						? 'border-transparent bg-galaxy_purple-300 text-galaxy_purple-750'
						: 'border-galaxy_purple-300 bg-galaxy_purple-750 text-galaxy_purple-300 hover:bg-galaxy_purple-300 hover:text-galaxy_purple-750'}"
					on:click={() => (bannerType = 'lc')}
				>
					<p>Lightcone</p>
				</button>
			</div>

			<div class="flex flex-wrap gap-x-2 gap-y-3">
				<button
					class="h-8 w-16 flex-shrink-0 items-center justify-center rounded-full border-2
        {warpRarity.includes(3)
						? 'border-transparent bg-neon_blue text-galaxy_purple-750 sm:hover:bg-galaxy_purple-750 sm:hover:text-neon_blue'
						: 'border-neon_blue bg-galaxy_purple-750 text-neon_blue sm:hover:bg-neon_blue sm:hover:text-galaxy_purple-750'}"
					on:click={() => changeWarpRarity(3)}
				>
					<p>3 ★</p>
				</button>
				<button
					class="h-8 w-16 flex-shrink-0 items-center justify-center rounded-full border-2
        {warpRarity.includes(4)
						? 'border-transparent bg-galaxy_purple-400 text-galaxy_purple-750 sm:hover:bg-galaxy_purple-750 sm:hover:text-galaxy_purple-400'
						: 'border-galaxy_purple-400 bg-galaxy_purple-750 text-galaxy_purple-400 sm:hover:bg-galaxy_purple-400 sm:hover:text-galaxy_purple-750'}"
					on:click={() => changeWarpRarity(4)}
				>
					<p>4 ★</p>
				</button>
				<button
					class="h-8 w-16 flex-shrink-0 items-center justify-center rounded-full border-2
        {warpRarity.includes(5)
						? 'border-transparent bg-neon_yellow text-galaxy_purple-750 sm:hover:bg-galaxy_purple-750 sm:hover:text-neon_yellow'
						: 'border-neon_yellow bg-galaxy_purple-750 text-neon_yellow sm:hover:bg-neon_yellow sm:hover:text-galaxy_purple-750'}"
					on:click={() => changeWarpRarity(5)}
				>
					<p>5 ★</p>
				</button>
			</div>

			<button
				class="relative h-8 w-44 rounded-full bg-galaxy_purple-750"
				aria-label="Toggle sort order"
				on:click={() => toggleSortOrder()}
			>
				<div class="flex items-center justify-center">
					<ArrowDownWideNarrow class="absolute left-4 h-4 w-4" />
					{#key sortOrder}
						<p class="pl-4 capitalize" in:slide={{ axis: 'y', duration: 200, easing: cubicInOut }}>
							{sortOrder}
						</p>
					{/key}
				</div>
			</button>
		</div>

		<div class="border-t-2 border-galaxy_purple-600">
			{#key filterLength}
				<p class="px-6 py-2 text-sm">
					Filtering <span class="font-bold">{displayStart}</span> - <span class="font-bold">{displayEnd}</span> of
					<span class="font-bold" in:fly={{ y: -20, duration: 400, easing: cubicInOut }}>{filterLength}</span> Warps
				</p>
			{/key}
		</div>
	</div>
</BaseCard>
