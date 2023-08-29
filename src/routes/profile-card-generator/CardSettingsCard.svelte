<script lang="ts">
	import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	export let playerUID: string;
	export let showUID: boolean;
	export let characterSelection: number;
	export let primaryColor: string;
	export let secondaryColor: string;

	let showCard = true;
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-650 bg-galaxy_purple-700
transition-all duration-300 hover:bg-galaxy_purple-700/95 sm:hover:scale-102"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="{showCard ? 'Hide' : 'Show'} Card generation settings card">
		<div class="flex items-center justify-between space-x-2 px-5 py-2 sm:py-3">
			<div class="flex items-center space-x-4">
				<SlidersHorizontal class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Card Settings</p>
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
			<div class="flex w-full flex-col space-y-4 font-bold">
				<label class="flex items-center space-x-3">
					<p>Player UID:</p>
					<input
						class="h-8 w-32 truncate rounded-full border-2 border-transparent bg-galaxy_purple-200 px-3 text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-400 focus:border-galaxy_purple-300"
						type="text"
						placeholder="123456789"
						bind:value={playerUID}
					/>
				</label>

				<div class="flex items-center space-x-3">
					<p>Show UID:</p>
					<input class="h-5 w-5" type="checkbox" bind:checked={showUID} />
				</div>

				<label class="flex items-center space-x-3">
					<p>Support Character Selection (1-4):</p>
					<input
						class="h-8 w-20 truncate rounded-full border-2 border-transparent bg-galaxy_purple-200 px-3 text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-400 focus:border-galaxy_purple-300"
						type="number"
						min="1"
						max="4"
						bind:value={characterSelection}
					/>
				</label>

				<label class="flex items-center space-x-3">
					<p><span class="font-normal text-galaxy_purple-200">Optional -</span> Primary Color (Hex):</p>
					<input
						class="h-8 w-28 truncate rounded-full border-2 border-transparent bg-galaxy_purple-200 px-3 text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-400 focus:border-galaxy_purple-300"
						type="text"
						placeholder="#2B2648"
						bind:value={primaryColor}
					/>
				</label>

				<label class="flex items-center space-x-3">
					<p><span class="font-normal text-galaxy_purple-200">Optional -</span> Secondary Color (Hex):</p>
					<input
						class="h-8 w-28 truncate rounded-full border-2 border-transparent bg-galaxy_purple-200 px-3 text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-400 focus:border-galaxy_purple-300"
						type="text"
						placeholder="#C099C7"
						bind:value={secondaryColor}
					/>
				</label>

                {#if (primaryColor && !secondaryColor) || (!primaryColor && secondaryColor)}
                <p class="text-neon_pink text-sm">
                    Please fill out both primary and secondary colors or leave both blank.
                </p>
                {/if}
			</div>
		</div>
	{/if}
</div>
