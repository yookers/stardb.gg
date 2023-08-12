<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search } from 'lucide-svelte';
	import Logo from './Logo.svelte';
	let searchQuery = '';
	let errorMessage = '';
	let m = { x: 0, y: 0 };

	function handleMove(event: MouseEvent) {
		m.x = (window.innerWidth / 2 - event.clientX) / 30;
		m.y = (window.innerHeight / 2 - event.clientY) / 30;
	}

	function searchPlayer(UID: string) {
		// Check if it's an UID (9 digits)
		const isUID = /^\d{9}$/.test(UID);

		if (!isUID) {
			errorMessage = 'UID must be 9 digits.';
			return;
		}

		goto(`/profile/${UID}`);
	}

	function handleKeyDown(e: KeyboardEvent) {
		errorMessage = ''; // Reset error message
		if (e.key === 'Enter') {
			searchPlayer(searchQuery);
		}
	}
</script>

<svelte:head>
	<title>stardb.gg - Honkai: Star Rail Tools and Leaderboard</title>
	<meta
		name="description"
		content="The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists."
	/>
</svelte:head>

<div class="flex flex-col items-center pt-80 text-off_white" on:pointermove={handleMove}>
	<div
		class="flex items-center space-x-4 stroke-galaxy_purple-250 py-16 font-dm_sans text-6xl tracking-tighter text-galaxy_purple-250 md:text-8xl"
	>
		<Logo class="w-14 overflow-visible fill-none stroke-[8] md:w-24" />
		<p class="select-none">stardb.gg</p>
	</div>

	<div class="mb-24 flex flex-col">
		<div class="flex items-center justify-center">
			<input
				class="h-14 w-80 rounded-l-xl border-y-2 border-l-2 border-transparent bg-galaxy_purple-150 px-5 text-lg font-bold text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-600 hover:border-galaxy_purple-250 md:h-16 md:w-[600px]
                {errorMessage ? 'focus:border-neon_pink' : 'focus:border-galaxy_purple-250'}"
				type="text"
				id="search"
				placeholder="Search for a UID ..."
				bind:value={searchQuery}
				on:keydown={handleKeyDown}
			/>

			<button
				class="h-14 rounded-r-xl bg-galaxy_purple-250 px-4 text-galaxy_purple-600 hover:scale-105 md:h-16"
				on:click={() => searchPlayer(searchQuery)}
			>
				<Search class="h-7 w-7" />
			</button>
		</div>
		{#if errorMessage}
			<p class="py-2 pl-5 font-bold text-neon_pink">{errorMessage}</p>
		{/if}
	</div>
</div>
