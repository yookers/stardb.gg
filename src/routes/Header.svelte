<script>
	import { isSidebarExpanded } from './store.js';
	import SearchBar from './SearchBar.svelte';
</script>

<header
	class="fixed left-0 top-0 flex h-16 w-full items-center justify-center border-b-2 border-purple_highlight bg-space_light duration-300 {$isSidebarExpanded
		? 'pl-48'
		: 'pl-16'}"
>
	<SearchBar />
</header>
