<script lang="ts">
	import { Pencil, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { DatabaseAchievement } from '$types';

	export let achievementData: DatabaseAchievement;
	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-600 bg-galaxy_purple-650
    transition-all duration-300 hover:bg-galaxy_purple-650/95 sm:hover:scale-102"
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
		<div
			class="flex flex-col items-center justify-center space-y-4 pb-3 pt-2 text-sm font-bold md:text-base"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div class="flex w-full flex-col px-6">
				<p>Description:</p>
				<p class="font-normal">{@html achievementData.description.replace(/\\n/g, '<br>')}</p>
			</div>

			<div class="flex w-full flex-col border-t-2 border-galaxy_purple-600 px-6 pt-2">
				<p>How to Obtain:</p>
				{#if achievementData.comment}
					<p class="font-normal">{achievementData.comment}</p>
				{:else}
					<p class="font-normal">Trivial or extremely easy to obtain. Requires no further comment.</p>
				{/if}
			</div>

			<div class="flex w-full flex-col border-t-2 border-galaxy_purple-600 px-6 pt-2">
				<p>Reference:</p>
				{#if achievementData.reference}
					<p class="font-normal">{achievementData.reference}</p>
				{:else}
					<p class="font-normal">
						Missing or no specific pop-cultural reference.
						<!--  If you have a suggestion, please leave your comment below. -->
					</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
