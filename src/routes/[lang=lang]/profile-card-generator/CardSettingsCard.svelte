<script lang="ts">
	import { SlidersHorizontal } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';

	export let playerUID: string;
	export let showUID: boolean;
	export let characterSelection: number;
	export let primaryColor: string;
	export let secondaryColor: string;

	let showCard = true;
</script>

<BaseCard label="Card settings" title="Card Settings">
	<div slot="icon">
		<SlidersHorizontal class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="px-5 pb-3 pt-4">
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
					max="8"
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
				<p class="text-sm text-neon_pink">Please fill out both primary and secondary colors or leave both blank.</p>
			{/if}
		</div>
	</div>
</BaseCard>
