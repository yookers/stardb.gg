<script lang="ts">
	import { Pencil, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-750 bg-galaxy_purple-800
    transition-all duration-300 hover:bg-galaxy_purple-800/95 sm:hover:scale-102"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} Information card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<Pencil class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Information</p>
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
		<div class="flex items-center justify-center pb-3 pt-2" transition:slide={{ duration: 300, easing: cubicInOut }}>
			<div class="flex flex-col space-y-3 text-sm sm:text-base">
				<div class="space-y-3 border-b-2 border-galaxy_purple-750 px-6 pb-3">
					<p>
						Welcome to <span class="font-bold">StarDB.GG's Tier List</span>; a ranking created by the community. Results are
						based on player votes in the current meta, making it a true reflection of the community's opinion.
					</p>
					<p>
						This list caters to <span class="font-bold">F2P</span> and
						<span class="font-bold">Light Spenders</span> - 5-star units are displayed at

						<span class="font-bold">Eidolon 0</span>, and 4-star units at <span class="font-bold">Eidolon 4</span>.
					</p>
					<div class="flex">
						<a
							class="group flex items-center space-x-1 font-bold text-galaxy_purple-200 underline hover:text-galaxy_purple-300"
							href="/tier-list/vote"
						>
							<p>Click here to vote</p>
							<ArrowUpRight class="mt-0.5 h-5 w-5 group-hover:-translate-y-0.5" />
						</a>
					</div>
				</div>
				<div class="space-y-3 px-6">
					<p>
						<span class="font-bold italic">Variance:</span><br /> A high variance suggests a broad range of opinions regarding a
						character, whereas a low variance indicates a general consensus.
					</p>
					<p>
						<span class="font-bold italic">95% Confidence Interval:</span><br /> This range indicates where one can be 95% confident
						that the character's true rank lies. For example, if a character has a rating of +/- 2, their realistic rank could be
						between 'S' and 'B'.
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
