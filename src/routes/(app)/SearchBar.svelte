<script lang="ts">
	const apiURL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	import { searchResults } from './store';

	let searchQuery = '';

	async function searchPlayer(query: string) {
		if (query === '') {
			searchResults.set([]);
			return null;
		}
		// Check if it's an UID (9 digits) else it's a name
		const isUID = /^\d{9}$/.test(query);

		const requestURL = isUID ? `${apiURL}/scores/${query}` : `${apiURL}/scores?query=${query}`;
		try {
			const response = await fetch(requestURL);
			if (!response.ok) {
				console.error('Error fetching player data:', response.statusText);
				return null;
			}
			const data = await response.json();
			if (isUID) {
				searchResults.set([data]); // Wrap in array because it is a single player data
			} else {
				searchResults.set(data.scores);
			}
		} catch (error) {
			console.error('Error fetching player data:', error);
		}
		return null;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			searchPlayer(searchQuery);
		}
	}
</script>

<div class="flex justify-center overflow-hidden">
	<button
		class="flex h-8 items-center justify-center rounded-l-lg bg-purple_highlight"
		aria-label="Search for Player Name or UID"
		on:click={() => searchPlayer(searchQuery)}
	>
		<Icon src={MagnifyingGlass} solid class="m-2 h-5 w-5 text-off_white" />
	</button>

	<input
		bind:value={searchQuery}
		on:keydown={handleKeyDown}
		class="h-8 w-52 rounded-r-lg border-2 border-purple_highlight border-transparent bg-space_dark pl-4 text-sm text-off_white outline-none focus:border-purple_highlight md:w-80"
		type="text"
		id="search"
		placeholder="Search UID or Name"
	/>
</div>
