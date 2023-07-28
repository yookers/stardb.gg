<script lang="ts">
	import { UserPlus, Plus, ChevronDown, ChevronUp, Info } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let addPlayerUID: (uid: string) => Promise<void>;

	let showCard = false;
	let playerUID = '';
	let errorMessage = '';

	function handleAddPlayer(playerUID: string) {
		// Check if UID is 9 digits
		/^\d{9}$/.test(playerUID) ? addPlayerUID(playerUID) : (errorMessage = 'UID must be 9 digits.');
	}

	function handleKeyDown(e: KeyboardEvent) {
		errorMessage = ''; // Reset error message
		if (e.key === 'Enter') {
			handleAddPlayer(playerUID);
		}
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-550 bg-galaxy_purple-600 pt-3
    transition-all duration-300 hover:scale-103 hover:bg-galaxy_purple-600/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<UserPlus class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Add Player</p>
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
			class="flex items-center justify-center px-6 pb-3 pt-2"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div class="w-full space-y-2">
				<div class="flex items-center space-x-2 pl-2">
					<Info class="h-4 w-4 text-off_white" />
					<p class="text-xs sm:text-sm">Can't find a player? Add their UID below!</p>
				</div>
				<div class="flex">
					<input
						class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-700 px-4 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-galaxy_purple-300 focus:border-galaxy_purple-450 sm:text-base"
						class:focus:border-neon_pink={errorMessage}
						type="text"
						placeholder="Add Player UID"
						bind:value={playerUID}
						on:keydown={handleKeyDown}
					/>
					<button
						class="rounded-r-full bg-galaxy_purple-300 px-2.5 text-galaxy_purple-700 hover:scale-105 hover:bg-galaxy_purple-350 hover:text-galaxy_purple-750"
						aria-label="Add Player UID"
						on:click={() => handleAddPlayer(playerUID)}
					>
						<Plus class="h-6 w-6 lg:h-7 lg:w-7" />
					</button>
				</div>
				{#if errorMessage}
					<p class="pl-4 text-xs font-bold text-neon_pink">{errorMessage}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
