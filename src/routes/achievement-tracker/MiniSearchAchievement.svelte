<script lang="ts">
	import { Search } from 'lucide-svelte';
	export let searchQuery = '';
</script>

<div
	class="rounded-2xl border-2 border-galaxy_purple-700 bg-galaxy_purple-750
    transition-all duration-300 hover:scale-102 hover:bg-galaxy_purple-750/95"
>
	<div class="flex px-1 py-1">
		<input
			class="h-10 w-full rounded-l-xl border-y-2 border-l-2 border-transparent bg-galaxy_purple-650 px-4 text-sm font-bold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-300 sm:text-base"
			type="text"
			bind:value={searchQuery}
			placeholder="Search Achievement ..."
		/>
		<button
			class="rounded-r-xl bg-galaxy_purple-300 px-3 text-galaxy_purple-700 hover:scale-105 hover:bg-galaxy_purple-350 hover:text-galaxy_purple-750"
			aria-label="Search for achievement"
		>
			<Search class="h-5 w-5 lg:h-6 lg:w-6" />
		</button>
	</div>
</div>
