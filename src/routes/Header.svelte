<script>
	import { isSidebarExpanded, mobileSidebarToggle } from './store.js';
	import SearchBar from './SearchBar.svelte';
	import { Icon, Bars3, User } from 'svelte-hero-icons';

	function toggleMobileSidebar() {
		mobileSidebarToggle.set(!$mobileSidebarToggle);
	}
</script>

<header
	class="fixed left-0 top-0 flex h-16 w-full items-center justify-between border-b-2 border-purple_highlight bg-space_light duration-300 {$isSidebarExpanded
		? 'md:pl-48'
		: 'md:pl-16'}"
>
	<button
		class="ml-4 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent focus:border-white_warm md:invisible"
		on:click={() => toggleMobileSidebar()}
	>
		<Icon src={Bars3} solid class="h-5 w-5 text-white_warm" />
	</button>
	<div class="text-center">
		<SearchBar />
	</div>
	<a href="/login" class="mr-4 flex h-8 w-8 items-center justify-center space-x-2 rounded-lg border-2 border-transparent bg-purple_highlight text-white_warm hover:border-white_warm md:mr-8 md:w-20">
			<Icon src={User} solid class="h-4 w-4 " />
			<p class="hidden text-sm font-bold md:flex">Login</p>
	</a>
</header>
