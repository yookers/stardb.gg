<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
	import { isSidebarExpanded } from './store.js';
</script>

<main class="flex h-screen flex-col">
	<div class="hidden md:flex">
		<Sidebar />
	</div>
	<Header />
	<div class="flex-grow pt-16 duration-300 {$isSidebarExpanded ? 'md:pl-48' : 'md:pl-16'}">
		<!-- Main content needs to account for header height and sidebar width. -->
		<slot />
	</div>
</main>
