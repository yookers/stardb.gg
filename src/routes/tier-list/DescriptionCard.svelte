<script lang="ts">
	import { Pencil, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let showCard = false;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-750 bg-galaxy_purple-800
    transition-all duration-300 hover:bg-galaxy_purple-800/95 sm:hover:scale-102"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} sample card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<Pencil class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Description</p>
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
				<div class="border-b-2 border-galaxy_purple-750 px-6 pb-3">
					<p>
						Welcome to <span class="font-bold">StarDB.GG's Tier List</span>, a collective ranking created by you, the community!<br
						/>Instead of just one person's opinion, our data is based on votes gathered through a form. This makes it a true
						reflection of community wisdom.<br />In this list that caters to F2P and Light Spenders, 5-star units are displayed
						at Eidolon 0, and 4-star units at Eidolon 4.
					</p>
					<div class="flex pt-1">
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
						<span class="font-bold italic">95% Confidence Interval:</span><br /> This represents a range where we're 95% confident
						the character's true rank lies. If a character has a rating of +/- 2, they could realistically be between 'S' and 'B'.
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
