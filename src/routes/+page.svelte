<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search } from 'lucide-svelte';
	import Logo from './Logo.svelte';
	let searchQuery = '';
	let errorMessage = '';

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
	<title>StarDB.GG - Honkai: Star Rail Tools and Leaderboard</title>
	<meta
		name="description"
		content="The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists."
	/>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://stardb.gg" />
	<meta property="og:title" content="StarDB.GG - Honkai: Star Rail Tools and Leaderboard" />
	<meta
		property="og:description"
		content="The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists."
	/>
	<meta property="og:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://stardb.gg" />
	<meta name="twitter:title" content="StarDB.GG - Honkai: Star Rail Tools and Leaderboard" />
	<meta
		name="twitter:description"
		content="The best achievement tracker and leaderboards for Honkai: Star Rail. Featuring Tools, Guides, and community Tier Lists."
	/>
	<meta name="twitter:image" content="https://stardb.gg/images/StarDB.GG_Featured_Image.webp" />

	<link rel="canonical" href="https://stardb.gg" />
</svelte:head>

<main class="relative flex h-full flex-col items-center justify-center text-off_white">
	<a href="https://ko-fi.com/stardb" aria-label="Ko-fi link" target="_blank" rel="noopener noreferrer">
		<img class="absolute right-4 top-4 h-auto w-56 rounded-lg" src="/images/kofi-button.webp" alt="Ko-fi icon" />
	</a>

	<div class="relative flex items-center space-x-3 stroke-galaxy_purple-250 py-8 sm:space-x-4 md:py-16">
		<Logo class="w-10 overflow-visible fill-none stroke-[8] sm:w-12 md:w-24" />
		<p class="select-none font-dm_sans text-5xl tracking-tighter text-galaxy_purple-250 sm:text-6xl md:text-8xl">stardb.gg</p>
		<div class="absolute -right-12 top-3 flex w-14 justify-center rounded-full bg-galaxy_purple-250 md:top-8 md:w-16">
			<p class="text-sm font-bold text-galaxy_purple-750 md:text-base">Beta</p>
		</div>
	</div>

	<div class="mb-24 flex flex-col px-6 pb-12">
		<div class="relative flex items-center justify-center">
			<input
				class="h-12 w-full rounded-l-xl border-y-2 border-l-2 border-transparent bg-galaxy_purple-150 px-5 text-base font-bold text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-600 hover:border-galaxy_purple-250 sm:h-14 md:h-16 md:w-[600px] md:text-lg
                {errorMessage ? 'focus:border-neon_pink' : 'focus:border-galaxy_purple-250'}"
				type="text"
				id="search"
				placeholder="Search for a UID ..."
				bind:value={searchQuery}
				on:keydown={handleKeyDown}
			/>

			<button
				class="h-12 rounded-r-xl bg-galaxy_purple-250 px-4 text-galaxy_purple-600 hover:scale-105 sm:h-14 md:h-16"
				aria-label="Search player UID"
				on:click={() => searchPlayer(searchQuery)}
			>
				<Search class="h-6 w-6 md:h-7 md:w-7" />
			</button>
			{#if errorMessage}
				<p class="absolute -bottom-8 left-2 font-bold text-neon_pink">{errorMessage}</p>
			{/if}
		</div>
	</div>

	<a class="absolute bottom-3 left-4 text-sm hover:text-galaxy_purple-250 md:left-20" href="/privacy-policy">Privacy Policy</a>
</main>
