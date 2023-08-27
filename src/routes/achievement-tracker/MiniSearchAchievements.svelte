<script lang="ts">
	import { Search } from 'lucide-svelte';
	export let searchQuery = '';
</script>

<div
	class="relative flex
    transition-all duration-300 sm:hover:scale-102"
>
	<input
		class="h-12 w-full rounded-xl border-y-2 border-l-2 border-galaxy_purple-650 bg-galaxy_purple-700 px-5 text-sm font-bold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 hover:bg-galaxy_purple-700/95 focus:border-galaxy_purple-300 sm:text-base"
		type="text"
		bind:value={searchQuery}
		placeholder="Search by Name or Description ..."
	/>
	<button
		class="absolute right-0 h-full rounded-r-xl bg-galaxy_purple-300 px-3 text-galaxy_purple-700 hover:scale-105 hover:bg-galaxy_purple-350 hover:text-galaxy_purple-750"
		aria-label="Search for achievement"
	>
		<Search class="h-5 w-5 lg:h-6 lg:w-6" />
	</button>
</div>
