<script lang="ts">
	import { UserPlus, Plus, Info } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { locale } from '$store';
	import translations from '$lib/translations/translations';

	export let addPlayerUID: (uid: string) => Promise<void>;

	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';

	let showCard = false;
	let playerUID = '';
	let errorMessage = '';

	function handleAddPlayer(playerUID: string) {
		// Check if UID is 9 digits
		/^\d{9}$/.test(playerUID) ? addPlayerUID(playerUID) : (errorMessage = translations[lang].uid_must_be_9_digits);
	}

	function handleKeyDown(e: KeyboardEvent) {
		errorMessage = ''; // Reset error message
		if (e.key === 'Enter') {
			handleAddPlayer(playerUID);
		}
	}
</script>

<BaseCard label={translations[lang].add_player} title={translations[lang].add_player}>
	<div slot="icon">
		<UserPlus class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="space-y-2 px-5 pb-3 pt-4">
		<div class="flex items-center space-x-2 pl-2">
			<Info class="mt-0.5 h-4 w-4" />
			<p class="text-xs sm:text-sm">{translations[lang].cant_find_player}</p>
		</div>
		<div class="flex">
			<input
				class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-700 px-5 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-300 sm:text-base"
				class:focus:border-neon_pink={errorMessage}
				type="text"
				placeholder={translations[lang].add_player_uid}
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
