<script lang="ts">
	import { UserPlus, Plus, Info } from 'lucide-svelte';
    import BaseCard from '$components/BaseCard.svelte';
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

<BaseCard label="Add player" title="Add Player">
	<div slot="icon">
		<UserPlus class="h-5 w-5 text-off_white" />
	</div>
    <div slot="content" class="pt-4 pb-3 px-5 space-y-2">
            <div class="flex items-center space-x-2 pl-2">
                <Info class="h-4 w-4 mt-0.5" />
                <p class="text-xs sm:text-sm">Can't find a player? Add their UID below!</p>
            </div>
            <div class="flex">
                <input
                    class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-700 px-5 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-300 sm:text-base"
                    class:focus:border-neon_pink={errorMessage}
                    type="text"
                    placeholder="Add Player UID ..."
                    bind:value={playerUID}
                    on:keydown={handleKeyDown}
                />
                <button
                    class="rounded-r-full bg-galaxy_purple-300 px-2.5 text-galaxy_purple-700 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
                    aria-label="Add player UID"
                    on:click={() => handleAddPlayer(playerUID)}
                >
                    <Plus class="h-5 w-5" />
                </button>
            </div>
            {#if errorMessage}
                <p class="pl-4 text-xs font-bold text-neon_pink">{errorMessage}</p>
            {/if}
        </div>
</BaseCard>
