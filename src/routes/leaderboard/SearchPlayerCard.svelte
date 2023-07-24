<script>
	import { Search, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let searchByName;
	export let searchByUID;

	let showCard = true;
	let searchType = 'Name'; // 'Name' or 'UID'
	let searchQuery = '';
	let errorMessage = '';

	function searchPlayer(searchQuery) {
		if (searchType === 'Name') {
			searchByName(searchQuery);
		} else if (searchType === 'UID') {
			// Check if UID is 9 digits
			/^\d{9}$/.test(searchQuery)
				? searchByUID(searchQuery)
				: (errorMessage = 'UID must be 9 digits.');
		}
		return;
	}

	function handleKeyDown(e) {
        errorMessage = ''; // Reset error message
		if (e.key === 'Enter') {
			searchPlayer(searchQuery);
		}
	}

	function changeSearchType() {
		searchType === 'Name' ? (searchType = 'UID') : (searchType = 'Name');
		errorMessage = '';
	}
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-500 bg-galaxy_purple-550 pt-3
    transition-all duration-300 hover:scale-103 hover:bg-galaxy_purple-550/95"
>
	<!-- Card Title -->
	<button class="w-full" on:click={() => (showCard = !showCard)} aria-label="Show/Hide Card Toggle">
		<div class="flex items-center justify-between px-5 pb-3">
			<div class="flex items-center space-x-4">
				<Search class="h-5 w-5 text-off_white lg:h-6 lg:w-6" />
				<p class="text-xl font-bold lg:text-2xl">Search Player</p>
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
			class="flex space-x-4 overflow-auto px-6 pb-3 pt-2 text-sm"
			transition:slide={{ duration: 300, easing: cubicInOut }}
		>
			<div
				class="relative flex h-10 w-32 select-none items-center rounded-full bg-galaxy_purple-650 text-center font-bold"
			>
				<button
					class="h-full w-16 px-4"
					aria-label="Set Search Type to Name"
					on:click={() => changeSearchType()}>Name</button
				>
				<button
					class="h-full w-16 px-4"
					aria-label="Set Search Type to UID"
					on:click={() => changeSearchType()}>UID</button
				>
				<span
					class="absolute flex h-8 w-16 items-center justify-center rounded-full bg-galaxy_purple-400 text-galaxy_purple-650 duration-300
                    {searchType === 'Name' ? 'left-1' : 'left-[calc(50%-4px)]'}"
				>
					{searchType}
				</span>
			</div>

			<div class="flex w-full flex-col">
				<div class="flex">
					<input
						class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-650 px-4 text-sm font-bold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-400 sm:text-base"
						class:focus:border-neon_pink={errorMessage}
						type="text"
						placeholder="Search {searchType} ..."
						bind:value={searchQuery}
						on:keydown={handleKeyDown}
					/>
                    <button
						class="rounded-r-full bg-galaxy_purple-300 px-3 text-galaxy_purple-700 hover:scale-105 hover:bg-galaxy_purple-350 hover:text-galaxy_purple-750"
						on:click={() => searchPlayer(searchQuery)}
					>
						<Search class="h-5 w-5 lg:h-6 lg:w-6" />
					</button>
				</div>
				{#if errorMessage}
					<p class="pl-4 pt-2 text-xs font-bold text-neon_pink">{errorMessage}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
