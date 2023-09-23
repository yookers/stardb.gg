<script lang="ts">
	import BaseCard from '$components/BaseCard.svelte';
	import { Search } from 'lucide-svelte';
	export let searchByName: (query: string) => void;
	export let searchByUID: (query: string) => void;

	let searchType = 'Name'; // 'Name' or 'UID'
	let searchQuery = '';
	let errorMessage = '';

	function searchPlayer(searchQuery: string) {
		if (searchType === 'Name') {
			searchByName(searchQuery);
		} else if (searchType === 'UID') {
			// Check if UID is 9 digits
			/^\d{9}$/.test(searchQuery) ? searchByUID(searchQuery) : (errorMessage = 'UID must be 9 digits.');
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
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

<BaseCard label="Search player" title="Search Player">
	<div slot="icon">
		<Search class="h-5 w-5 text-off_white" />
	</div>

	<div slot="content" class="flex px-5 pb-3 pt-2 text-sm sm:flex-row sm:gap-x-4 sm:gap-y-0">
		<div
			class="relative flex h-10 w-32 flex-shrink-0 select-none items-center rounded-full bg-galaxy_purple-700 text-center font-bold text-galaxy_purple-200"
		>
			<button class="h-full w-16 px-4" aria-label="Set search type to Name" on:click={() => changeSearchType()}>Name</button>
			<button class="h-full w-16 px-4" aria-label="Set search type to UID" on:click={() => changeSearchType()}>UID</button>
			<span
				class="absolute flex h-8 w-16 items-center justify-center rounded-full bg-galaxy_purple-200 text-galaxy_purple-700 duration-300
                    {searchType === 'Name' ? 'left-1' : 'left-[calc(50%-4px)]'}"
			>
				{searchType}
			</span>
		</div>

		<div class="flex w-full flex-col">
			<div class="flex">
				<input
					class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-700 px-5 text-sm font-bold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-300 sm:text-base"
					class:focus:border-neon_pink={errorMessage}
					type="text"
					placeholder="Search by {searchType} ..."
					bind:value={searchQuery}
					on:keydown={handleKeyDown}
				/>
				<button
					class="rounded-r-full bg-galaxy_purple-300 px-3 text-galaxy_purple-700 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
					aria-label="Search for player {searchType}"
					on:click={() => searchPlayer(searchQuery)}
				>
					<Search class="h-5 w-5" />
				</button>
			</div>
			{#if errorMessage}
				<p class="pl-4 pt-2 text-xs font-bold text-neon_pink">{errorMessage}</p>
			{/if}
		</div>
	</div>
</BaseCard>
